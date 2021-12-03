
(function ($) {
  var editBtn = $('.profile-edit-btn');
  var contents = $(".editp");
  var submit = $('#xacnhan');
  delete contents.length;
  delete contents.prevObject;
  console.log(editBtn)
  editBtn.click(function (e) {
      e.preventDefault();
      for (const [key, value] of Object.entries(contents)) {
          content = value;
          content.contentEditable = !content.isContentEditable;
          if (content.contentEditable === 'false') {
              content.style.background = 'none';
              content.style.color = '#fff';
          } else {
              content.style.background = '#fff';
              content.style.color = '#0062cc';
              content.value = "Save";
          }
      }

      if(submit.css('display') == 'none'){ 
          submit.show('fast'); 
      } else { 
          submit.hide('fast'); 
      }
  });

  $("#editstudent").submit(function () {

    var name = $("#nametoedit").html().trim();
    var email = $("#emailtoedit").html().trim();
    var sdt = $("#sdttoedit").html().trim();

    var input = $("<input />", {
        name: "hoten",
        value: name,
        type: "hidden"
    });
    var input2 = $("<input />", {
        name: "email",
        value: email,
        type: "hidden"
    });
    var input3 = $("<input />", {
        name: "sdt",
        value: sdt,
        type: "hidden"
    });
    $(this).append(input, input2, input3);
});

$("#editteacher").submit(function() {
    var name = $("#nametoedit").html().trim();
    var sdt = $("#sdttoedit").html().trim();

    var input = $("<input />", {
        name: "hoten",
        value: name,
        type: "hidden"
    });
    var input3 = $("<input />", {
        name: "sdt",
        value: sdt,
        type: "hidden"
    });
    $(this).append(input, input3);
});

})(jQuery);