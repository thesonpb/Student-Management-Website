        var relValue = "5";
        console.log($(`.nav li[data-rel="${relValue}"]`))
        $(`.nav li[data-rel="${relValue}"]`).addClass('active');
