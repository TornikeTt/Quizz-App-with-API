$(document).ready(function() {
    $(".startQuiz").click(function(e) {
        e.preventDefault()
        $(".quizType__handle").hide("slow")
        $(".Test").animate({ top: "60px" })
        $(".header__container").animate({ "padding-bottom": "50px" })
    })

    $(".close__quiz").click(function() {
        location.reload();
    })

    
})