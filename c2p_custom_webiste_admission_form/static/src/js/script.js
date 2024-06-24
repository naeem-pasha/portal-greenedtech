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
    $('#academic_history').append('<tr id="td_no_reocrd" class="td_no_reocrd"><td colspan="5">No Record</td></tr>');
    $('#step_number_1').on('click', function(){
        if($('#title').val() != '') {
            if($('#first_name').val() != '') {
                if($('#last_name').val() != '') {
                    if($('#gender').val() != '') {
                        if($('#birth_date').val() != '') {
                            if($('#email').val() != '') {
                                if($('#country_id').val() != ''){
                                    if($('#state_id').val() != ''){
                                        if($('#city').val() != ''){
                                            if($('#zip').val() != ''){
                                                if($('#mobile').val() != ''){
                                                    if($('#street').val() != ''){
                                                        $('li[step="1"]').removeClass('form-stepper-active').addClass('form-stepper-unfinished');
                                                        $('li[step="2"]').removeClass('form-stepper-unfinished').addClass('form-stepper-active');
                                                        $('li[step="3"]').removeClass('form-stepper-active').addClass('form-stepper-unfinished');
                                                        $('#step-1').removeClass('d-block').addClass('d-none');
                                                        $('#step-2').removeClass('d-none').addClass('d-block');
                                                        $('#step-3').removeClass('d-block').addClass('d-none');
                                                        var birthDate = $('#birth_date').val();
                                                        var currentDate = new Date();
                                                        var age = calculateAge(birthDate, currentDate);
                                                        $('#age').val(age);
                                                    }
                                                    else {
                                                        toastr.error('Enter Your Address');
                                                    }
                                                }
                                                else {
                                                    toastr.error('Enter Your Mobile');
                                                }
                                            }
                                            else {
                                                toastr.error('Enter Your Zip');
                                            }
                                        }
                                        else {
                                            toastr.error('Enter Your City');
                                        }
                                    }
                                    else {
                                        toastr.error('Enter Your State Name');
                                    }
                                }
                                else {
                                    toastr.error('Enter Your Country Name');
                                }
                            }
                            else {
                                toastr.error('Enter Your Email');
                            }
                        }
                        else {
                            toastr.error('Enter Your Birth Date');
                        }
                    }
                    else {
                        toastr.error('Enter Your Gender');
                    }
                }
                else {
                    toastr.error('Enter Your Last Name');
                }
            }
            else {
                toastr.error('Enter Your First Name');
            }
        }
        else {
            toastr.error('Enter Your Title');
        }
    });
    $('#step_number_2').on('click', function(){
        $('li[step="1"]').removeClass('form-stepper-unfinished').addClass('form-stepper-active');
        $('li[step="2"]').removeClass('form-stepper-active').addClass('form-stepper-unfinished');
        $('li[step="3"]').removeClass('form-stepper-active').addClass('form-stepper-unfinished');
        $('#step-1').removeClass('d-none').addClass('d-block');
        $('#step-2').removeClass('d-block').addClass('d-none');
        $('#step-3').removeClass('d-block').addClass('d-none');
    });
    $('#step_number_3').on('click', function(){
        if($('#prev_institute_id').val() != '') {
            if($('#prev_course_id').val() != '') {
                if($('#prev_result').val() != '') {
                    var academic_history = $('#academic_history .academic_history_row').length;
                    if(academic_history > 0) {
                        $('li[step="1"]').removeClass("form-stepper-active").addClass('form-stepper-unfinished');
                        $('li[step="2"]').removeClass("form-stepper-active").addClass('form-stepper-unfinished');
                        $('li[step="3"]').removeClass("form-stepper-unfinished").addClass('form-stepper-active');
                        $('#step-1').removeClass('d-block').addClass('d-none');
                        $('#step-2').removeClass('d-block').addClass('d-none');
                        $('#step-3').removeClass('d-none').addClass('d-block');
                        var academic_history_row = $('#academic_history tr').length;
                        var array_list = [];
                        $('#academic_history_array').val('');
                        for(var i = 0; i < academic_history_row; i++) {
                            array_list.push({
                                'institute_name': $(`#institute_name${i}`).val(),
                                'course_name': $(`#course_name${i}`).val(),
                                'year_of_completion': $(`#year_of_completion${i}`).val(),
                                'result': $(`#result${i}`).val()
                            });
                        }
                        $('#academic_history_array').val(JSON.stringify(array_list));
                    }
                    else {
                        $('li[step="1"]').removeClass("form-stepper-active").addClass('form-stepper-unfinished');
                        $('li[step="2"]').removeClass("form-stepper-active").addClass('form-stepper-unfinished');
                        $('li[step="3"]').removeClass("form-stepper-unfinished").addClass('form-stepper-active');
                        $('#step-1').removeClass('d-block').addClass('d-none');
                        $('#step-2').removeClass('d-block').addClass('d-none');
                        $('#step-3').removeClass('d-none').addClass('d-block');
                        var academic_history_row = $('#academic_history tr').length;
                        var array_list = [];
                        $('#academic_history_array').val('');
                        for(var i = 0; i < academic_history_row; i++) {
                            array_list.push({
                                'institute_name': $(`#institute_name${i}`).val(),
                                'course_name': $(`#course_name${i}`).val(),
                                'year_of_completion': $(`#year_of_completion${i}`).val(),
                                'result': $(`#result${i}`).val()
                            });
                        }
                        $('#academic_history_array').val(JSON.stringify(array_list));
                    }
                }
                else {
                    toastr.error('Enter Your Result');
                }
            }
            else {
                toastr.error('Enter Your Course Name');
            }
        }
        else {
            toastr.error('Enter Your Institute Name');
        }
    });
    $('#step_number_4').on('click', function(){
        $('li[step="1"]').removeClass("form-stepper-active").addClass('form-stepper-unfinished');
        $('li[step="2"]').removeClass("form-stepper-unfinished").addClass('form-stepper-active');
        $('li[step="3"]').removeClass("form-stepper-active").addClass('form-stepper-unfinished');
        $('#step-1').removeClass('d-block').addClass('d-none');
        $('#step-2').removeClass('d-none').addClass('d-block');
        $('#step-3').removeClass('d-block').addClass('d-none');
    });
    $('#submit_form').on('click', function(){
        if($('#branch_id').val() != '') {
            if($('#register_id').val() != '') {
                if($('#course_id').val() != '') {
                    var currentDate = new Date();
                    var formattedDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
                    var start_date = $('#start_date').val();
                    var end_date = $('#end_date').val();
                    var max_count = $('#max_count').val();
                    var check_max_count = $('#check_max_count').val();
                    var minimum_age_criteria = $('#minimum_age_criteria').val();
                    var age = $('#age').val();
                    if (formattedDate >= start_date && formattedDate <= end_date) {
                        if(max_count > check_max_count) {
                            if(minimum_age_criteria >= age) {
                                $('#submit').trigger('click');
                            }
                            else {
                                toastr.error(`Minimum Required Age(${minimum_age_criteria})`);
                            }
                        }
                        else {
                            toastr.error(`Maximum No. ${max_count} of Admission`);
                        }

                    } else {
                        toastr.error(`Current date ${formattedDate} is not within the range of start_date ${start_date} and end_date ${end_date} of Admission`);
                    }
                }
                else{
                    toastr.error('Enter Your Course Name');
                }
            }
            else{
                toastr.error('Enter Your Register Name');
            }
        }
        else{
            toastr.error('Enter Your Branch Name');
        }
    });
    $('#branch_id').on('change', function(){
        var branch_id = $('#branch_id').val();
        if(branch_id != '') {
            $.ajax({
                url: '/api/register_branch',
                type: 'GET',
                data: {
                    branch_id: branch_id
                },
                dataType: 'json',
                success: function(response) {
                    $('#register_id').empty();
                    $('#register_id').append('<option value="">Select Admission Register</option>');
                    for(var i = 0; i < response.length; i++) {
                        $('#register_id').append(`<option value="${response[i].id}" data-start_date="${response[i].start_date}" data-end_date="${response[i].end_date}" data-max_count="${response[i].max_count}" data-minimum_age_criteria="${response[i].minimum_age_criteria}" data-course_id="${response[i].course_id}">${response[i].name}</option>`);
                    }
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
    });
    $('#register_id').on('change', function(){
        var register_id = $('#register_id').val();
        if(register_id != '') {
            var start_date = $(`#register_id option[value="${register_id}"]`).data('start_date');
            var end_date = $(`#register_id option[value="${register_id}"]`).data('end_date');
            var max_count = $(`#register_id option[value="${register_id}"]`).data('max_count');
            var minimum_age_criteria = $(`#register_id option[value="${register_id}"]`).data('minimum_age_criteria');
            var course_id = $(`#register_id option[value="${register_id}"]`).data('course_id');
            $.ajax({
                url: '/api/course_register',
                type: 'GET',
                data: {
                    course_id: course_id,
                    register_id: register_id,
                },
                dataType: 'json',
                success: function(response) {
                    $('#course_id').empty();
                    $('#course_id').append('<option value="">Select Course</option>');
                    for(var i = 0; i < response.length; i++) {
                        $('#course_id').append(`<option value="${response[i].id}" data-check_max_count="${response[i].check_max_count}">${response[i].name}</option>`);
                    }
                    $('#start_date').val(start_date);
                    $('#end_date').val(end_date);
                    $('#max_count').val(max_count);
                    $('#minimum_age_criteria').val(minimum_age_criteria);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
        else {
            $('#start_date').val('');
            $('#end_date').val('');
            $('#max_count').val('');
            $('#minimum_age_criteria').val('');
        }
    });
    $('#course_id').on('change', function(){
        var course_id = $('#course_id').val();
        if(course_id != '') {
            var check_max_count = $(`#course_id option[value="${course_id}"]`).data('check_max_count');
            $('#check_max_count').val(check_max_count);
        }
        else {
            $('#check_max_count').val('');
        }
    });
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
    $('#academic_history_add').on('click', function(){
        var check_number = $('#academic_history .academic_history_row').length;
        if(check_number == 0) {
            $('#td_no_reocrd').remove();
        }
        var check_no = (number-1);
        if($(`#institute_name${check_no}`).val() != '') {
            if($(`#course_name${check_no}`).val() != '') {
                if($(`#year_of_completion${check_no}`).val() != '') {
                    if($(`#result${check_no}`).val() != '') {
                        $('#academic_history').append(`
                            <tr id="academic_history_row${number}" class="academic_history_row">
                                <td>
                                   <input type="text" class="form-control academic_history_check" id="institute_name${number}"  name="institute_name[]" required="True" />
                                </td>
                                <td>
                                   <input type="text" class="form-control academic_history_check" id="course_name${number}"  name="course_name[]" required="True" />
                                </td>
                                <td>
                                   <select id="year_of_completion${number}" name="year_of_completion[]" class="form-select academic_history_check" required="True">
                                         <option value="">Select Year Of Completion</option>
                                   </select>
                                </td>
                                <td>
                                   <input type="text" class="form-control academic_history_check" id="result${number}"  name="result[]" required="True" />
                                </td>
                                <td>
                                   <button class="button btn-danger" id="academic_history_delete${number}" onclick="AcademicHistoryDelete(${number})" name="academic_history_delete" type="button">Delete</button>
                                </td>
                            </tr>
                        `);
                        $(`#year_of_completion${number}`).empty();
                        $(`#year_of_completion${number}`).append(`<option value=''>Select Year Of Completion</option>`);
                        for (var i = 1900; i <= 4000; i++) {
                            $(`#year_of_completion${number}`).append(`<option value='${i}'>${i}</option>`);
                        }
//                        $(`#year_of_completion${number}`).select2();
                        number += 1;
                    }
                    else {
                        toastr.error('Enter Your Result');
                    }
                }
                else {
                    toastr.error('Enter Your Year Of Completion');
                }
            }
            else {
                toastr.error('Enter Your Course Name');
            }
        }
        else {
            toastr.error('Enter Your Institute Name');
        }
    });
});
function AcademicHistoryDelete(number) {
    $(`#academic_history_row${number}`).remove();
    var check_number = $('#academic_history .academic_history_row').length;
    if(check_number == 0) {
        $('#academic_history').append('<tr id="td_no_reocrd" class="td_no_reocrd"><td colspan="5">No Record</td></tr>');
    }
}
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