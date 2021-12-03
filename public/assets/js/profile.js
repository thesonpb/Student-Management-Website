   // hiển thị profile
   $('li .profile').click(function () {
    $('.nav li').removeClass('active');
    $('.main:last-of-type').stop().fadeIn(400, 'linear').siblings('.main').stop().fadeOut(0, 'linear');
});
  
  //edit prơfile
  var editBtn = $('.profile-edit-btn');
  var contents = $(".about p");
  delete contents.length;
  delete contents.prevObject;
  
//   editBtn.click(function (e) {
//       e.preventDefault();
//       for (const [key, value] of Object.entries(contents)) {
//           content = value;
//           content.contentEditable = !content.isContentEditable;
//           if (content.contentEditable === 'false') {
//               content.style.background = 'none';
//               content.style.color = '#fff';
//               // localStorage.setItem('content', content.innerHTML);
//           } else {
//               content.style.background = '#fff';
//               content.style.color = '#0062cc';
//               content.value = "Save";
//           }
//       }
//   });

  // chuyển profile về chế độ chỉnh sửa
  editBtn.click(function (e) {
    e.preventDefault();
    for (const [key, value] of Object.entries(contents)) {
        content = value;
        content.contentEditable = !content.isContentEditable;
        if (content.contentEditable === 'false') {
            content.style.background = 'none';
            content.style.color = '#fff';
            // localStorage.setItem('content', content.innerHTML);
        } else {
            content.style.background = '#fff';
            content.style.color = '#0062cc';
            content.value = "Save";
        }
    }
});