let radioBoxes = document.querySelectorAll('input[type=radio]');
var section = document.querySelector('#section');
var requestURL = 'https://abit-calc.herokuapp.com/api/prog/';
var specialties;
var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    specialties = request.response;
}

function onClickButton(){
    document.getElementById('section').innerHTML = "";
    Search_Value_TextBox();
    showSpecialities(znoName);
}

function showSpecialities(znoName) 
{
    for (let i = 0; i < specialties.length; i++) 
    {
        zno = specialties[i].certificates; 
        let intersectedSubjects = zno.filter(e => (e.name == znoName[0] && e.priority == 1)
                                               || (e.name == znoName[1])
                                               || (e.name == znoName[2]));

        if(intersectedSubjects.length == 3 && (intersectedSubjects.filter(e=>e.name == znoName[1])[0].priority
                                           != intersectedSubjects.filter(e=>e.name == znoName[2])[0].priority)){
            let stringZnoFirstPrio;
            let stringZnoSecondPrio;
            let stringZnoThirdPrio = "";
            let sum = 0;

            let stringZnoThirdCoef;

            let myArticle = document.createElement('article');
            let spec = document.createElement('span');
            let firstCertificate = document.createElement('p');
            let secondCertificate = document.createElement('p');
            let thirdCertificate = document.createElement('p');
            let sumBall = document.createElement('span');

            for(let j=0; j < zno.length; j++)
            {
                if(zno[j].priority === 1)
                {
                    sum += znoRating[0] * zno[j].coef;
                    stringZnoFirstPrio = '('+ zno[j].coef +'): <b>' + zno[j].name + '</b>';
                }
                else if(zno[j].priority == 2)
                {
                    sum += zno[j].name == znoName[1] ? znoRating[1] * zno[j].coef : znoRating[2] * zno[j].coef;
                    stringZnoSecondPrio = '('+ zno[j].coef +'): <b>' + zno[j].name + '</b>';
                }
                else if(zno[j].priority == 3 && zno[j].name == znoName[1])
                {
                    sum += znoRating[1] * zno[j].coef;
                    stringZnoThirdPrio += ` <b>${zno[j].name}</b>;`;
                    stringZnoThirdCoef = zno[j].coef
                }
                else if(zno[j].priority == 3 && zno[j].name == znoName[2])
                {
                    sum += znoRating[2] * zno[j].coef;
                    stringZnoThirdPrio += ` <b>${zno[j].name}</b>;`;
                    stringZnoThirdCoef = zno[j].coef
                }
                else
                    stringZnoThirdPrio += ' ' + zno[j].name + ';';
            }

            if(radioBoxes[0].checked)
                sum += 1.02 * znoRating[3];
            else if(radioBoxes[1].checked && specialties[i].additions.support == true)
                sum += 1.05 * znoRating[3];
            else sum += 1.02 * znoRating[3];

            spec.textContent = specialties[i].speciality.id < 100 
                             ? '0' + specialties[i].speciality.id + ' «' + specialties[i].speciality.name + '»'
                             : specialties[i].speciality.id + ' «' + specialties[i].speciality.name + '»';
            spec.textContent += ' — Спеціалізація: «' + specialties[i].program.name + '»';

            firstCertificate.innerHTML = '<i>Обовʼязковий</i> ' + stringZnoFirstPrio + ';';
            secondCertificate.innerHTML = '<i>Профільний</i> ' + stringZnoSecondPrio + ';';
            thirdCertificate.innerHTML = '<i>На вибір</i> (' + stringZnoThirdCoef + '): '  + stringZnoThirdPrio;
            sumBall.innerHTML = 'Конкурсний бал: ' + `${isNaN(sum) ? 0 : Math.floor(sum * 100) / 100 }`;

            myArticle.appendChild(spec);
            myArticle.appendChild(firstCertificate);
            myArticle.appendChild(secondCertificate);
            myArticle.appendChild(thirdCertificate);
            myArticle.appendChild(sumBall);

            section.appendChild(myArticle);
        }
    }
}