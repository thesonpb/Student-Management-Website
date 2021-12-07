// (function ($) {
//     var editBtn = $('.profile-edit-btn');
//     var contents = $(".editp");
//     var submit = $('#xacnhan');
//     delete contents.length;
//     delete contents.prevObject;
//     console.log(editBtn)
//     editBtn.click(function (e) {
//         e.preventDefault();
//         for (const [key, value] of Object.entries(contents)) {
//             content = value;
//             content.contentEditable = !content.isContentEditable;
//             if (content.contentEditable === 'false') {
//                 content.style.background = 'none';
//                 content.style.color = '#fff';
//             } else {
//                 content.style.background = '#fff';
//                 content.style.color = '#0062cc';
//                 content.value = "Save";
//             }
//         }
  
//         if(submit.css('display') == 'none'){ 
//             submit.show('fast'); 
//         } else { 
//             submit.hide('fast'); 
//         }
//     });
  
//     $("#editstudent").submit(async function (e) {
//       e.preventDefault();
//       var hoten = $("#nametoedit").html().trim();
//       var email = $("#emailtoedit").html().trim();
//       var sdt = $("#sdttoedit").html().trim();
//       const mssv = $("#mssv").html().trim(); ;
  
//       var input = $("<input />", {
//           name: "hoten",
//           value: hoten,
//           type: "hidden"
//       });
//       var input2 = $("<input />", {
//           name: "email",
//           value: email,
//           type: "hidden"
//       });
//       var input3 = $("<input />", {
//           name: "sdt",
//           value: sdt,
//           type: "hidden"
//       });
//       $(this).append(input, input2, input3);
//       try{
//           const res = await fetch(`/student/editprofile/${mssv}`, {
//               method: 'PATCH',
//               body: JSON.stringify({hoten, email, sdt}),
//               headers: {'Content-Type': 'application/json'}
//           });
//           location.assign('/profile');
//       }catch(e){
//           console.log(e);
//       }
//   });
  
//   $("#editteacher").submit(async function( e) {
//       e.preventDefault();
//       var hoten = $("#nametoedit").html().trim();
//       var sdt = $("#sdttoedit").html().trim();
//       const malop = $("#malop").html().trim();
  
//       var input = $("<input />", {
//           name: "hoten",
//           value: hoten,
//           type: "hidden"
//       });
//       var input3 = $("<input />", {
//           name: "sdt",
//           value: sdt,
//           type: "hidden"
//       });
  
//       const email = $("#emailtoedit").html().trim();
//       $(this).append(input, input3);
//       try{
//           const res = await fetch(`/teacher/editprofile/${email}/${malop}`, {
//               method: 'PATCH',
//               body: JSON.stringify({hoten, sdt}),
//               headers: {'Content-Type': 'application/json'}
//           });
//           location.assign(`/profile/${malop}`);
//       }catch(e){
//           console.log(e);
//       }
//   });
  
//   $("#img").on('change',function(event){
//            filename=$(this).val();
//       if(filename!==''){
//           $("#save").attr('disabled',false);
//       }
//   })
  
  
//   })(jQuery);

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
