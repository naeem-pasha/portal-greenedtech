$(document).ready(function() {
    // $('#title').select2();
    // $('#gender').select2();
    // $('#country_id').select2();
    // $('#state_id').select2();
    // $('#course_id').select2();
    // $('#batch_id').select2();
    // $('#fees_term_id').select2();
    // $('#branch_id').select2();
    // $('#register_id').select2();

    $('#submit_form').on('click', function(){
        $('#submit').trigger('click');
    //     // if($('#branch_id').val() != '') {
    //         if($('#register_id').val() != '') {
    //             if($('#course_id').val() != '') {
    //                 var currentDate = new Date();
    //                 var formattedDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
    //                 var start_date = $('#start_date').val();
    //                 var end_date = $('#end_date').val();
    //                 var max_count = $('#max_count').val();
    //                 var check_max_count = $('#check_max_count').val();
    //                 var minimum_age_criteria = $('#minimum_age_criteria').val();
    //                 var age = $('#age').val();
    //                 if (formattedDate >= start_date && formattedDate <= end_date) {
    //                     if(max_count > check_max_count) {
    //                         if(minimum_age_criteria >= age) {
    //                             $('#submit').trigger('click');
    //                         }
    //                         else {
    //                             toastr.error(`Minimum Required Age(${minimum_age_criteria})`);
    //                         }
    //                     }
    //                     else {
    //                         toastr.error(`Maximum No. ${max_count} of Admission`);
    //                     }

    //                 } else {
    //                     toastr.error(`Current date ${formattedDate} is not within the range of start_date ${start_date} and end_date ${end_date} of Admission`);
    //                 }
    //             }
    //             else{
    //                 toastr.error('Enter Your Course Name');
    //             }
    //         }
    //         else{
    //             toastr.error('Enter Your Register Name');
    //         }
    //     // }
    //     // else{
    //     //     toastr.error('Enter Your Branch Name');
    //     // }
    });

    // $('#register_id').on('change', function(){
    //     var register_id = $('#register_id').val();
    //     if(register_id != '') {
    //         var start_date = $(`#register_id option[value="${register_id}"]`).data('start_date');
    //         var end_date = $(`#register_id option[value="${register_id}"]`).data('end_date');
    //         var max_count = $(`#register_id option[value="${register_id}"]`).data('max_count');
    //         var minimum_age_criteria = $(`#register_id option[value="${register_id}"]`).data('minimum_age_criteria');
    //         var course_id = $(`#register_id option[value="${register_id}"]`).data('course_id');
    //         $.ajax({
    //             url: '/api/course_register',
    //             type: 'GET',
    //             data: {
    //                 course_id: course_id,
    //                 register_id: register_id,
    //             },
    //             dataType: 'json',
    //             success: function(response) {
    //                 // $('#course_id').empty();
    //                 $('#course_id').append('<option value="">Select Course</option>');
    //                 for(var i = 0; i < response.length; i++) {
    //                     $('#course_id').append(`<option value="${response[i].id}" data-check_max_count="${response[i].check_max_count}">${response[i].name}</option>`);
    //                 }
    //                 // $('#start_date').val(start_date);
    //                 // $('#end_date').val(end_date);
    //                 // $('#max_count').val(max_count);
    //                 // $('#minimum_age_criteria').val(minimum_age_criteria);
    //             },
    //             error: function(xhr, status, error) {
    //                 console.error(xhr.responseText);
    //             }
    //         });
    //     }
    //     else {
    //         $('#start_date').val('');
    //         $('#end_date').val('');
    //         $('#max_count').val('');
    //         $('#minimum_age_criteria').val('');
    //     }
    // });
    // $('#course_id').on('change', function(){
    //     var course_id = $('#course_id').val();
    //     if(course_id != '') {
    //         var check_max_count = $(`#course_id option[value="${course_id}"]`).data('check_max_count');
    //         $('#check_max_count').val(check_max_count);
    //     }
    //     else {
    //         $('#check_max_count').val('');
    //     }
    // });
    $('#country_id').on('change', function(){
        var country_id = $('#country_id').val();
        if(country_id != '') {
            $.ajax({
                url: '/api/state_country',
                type: 'GET',
                data: {
                    country_id: country_id
                },
                dataType: 'json',
                success: function(response) {
                    $('#state_id').empty();
                    $('#state_id').append('<option value="">Select State</option>');
                    for(var i = 0; i < response.length; i++) {
                        $('#state_id').append(`<option value="${response[i].id}">${response[i].name}</option>`);
                    }
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
    });
    var number = 0;
});

function calculateAge(birthDate, currentDate) {
    var birthDate = new Date(birthDate);
    var currentDate = new Date(currentDate);
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}