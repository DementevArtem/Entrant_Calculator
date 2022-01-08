let count = 0;
let znoName = [];
let znoRating = [];
let checkBoxes = document.querySelectorAll('input[type=checkbox]');
let textBoxes = document.querySelectorAll('input[type=text]');

Custom_Multi_Select();

function Search_Value_TextBox(){
    znoRating = [];
    for(let i=0;i<textBoxes.length-1;i++)
    {
        if(checkBoxes[i].checked)
        {
            if(textBoxes[i].value >= 100 && textBoxes[i].value <= 200)
                znoRating.push(textBoxes[i].value);
            else
                textBoxes[i].value = "Error";
        }
    }
    if(textBoxes[textBoxes.length - 1].value >= 4 && textBoxes[textBoxes.length - 1].value <= 12) 
    {
        znoRating.push(textBoxes[textBoxes.length - 1].value);
    }
    else {
        textBoxes[textBoxes.length - 1].value = "Error";
    }
}

function EnableDisableTextBox(chkTextBox, idTextBox) 
{
    count = chkTextBox.checked ? ++count : --count;
    
    if(count < 4){
        znoName = [];
        var txtBox = document.getElementById(idTextBox);
        txtBox.disabled = chkTextBox.checked ? false : true;

        for (var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].checked) 
            {
                znoName.push(checkBoxes[i].value);
            }
        }
    }
    else{
        chkTextBox.checked = false;
        count = 3;
    }
    if(count < 0) count = 0;
}

function Custom_Multi_Select()
{
    textBoxes[textBoxes.length-1].value = "";
    for (var i = 0; i < checkBoxes.length-1; i++) {
        textBoxes[i].value = "";
        if(checkBoxes[i].checked) 
        {
            checkBoxes[i].checked = false;
            textBoxes[i].disabled = true;
        }
    }
}
