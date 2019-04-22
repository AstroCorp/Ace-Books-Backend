window.onload = function()
{
    $("#menu-toggle").click(function()
    {
        if($('#sidebar').hasClass('sidebar-show'))
        {
            $('#sidebar').removeClass('sidebar-show');
        }
        else
        {
            $('#sidebar').addClass('sidebar-show');
        }
    });
};
