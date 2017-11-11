let min = 1;
let max = 10000;
let counter = 1;

const appender = (container, num, response, counter, param) =>{
    let node = document.createElement('p');
    let text = `${counter} time - Asked for ${num} - Server responsed with ${response.data}`;
    if(param){
        text = `Server responsed with ${response.data} -  Number = ${num}`;
    }
    let res = document.createTextNode(text);
    node.appendChild(res);
    container.appendChild(node);
};

document.addEventListener("DOMContentLoaded", () =>{
    let button = document.getElementById("startButton");

    let div = document.querySelector('.centered.back.scroll');

    const checker = () =>{
        let number = parseInt((max-min)/2) + min;
        axios({
            method: 'post',
            url:'/',
            params: {
                num: number
            }
        })
        .then(response =>{
            if(response.data == "less"){
                appender(div, number, response, counter, false);
                max = number;
                counter++;
                checker();

            }else if(response.data == "more"){
                appender(div, number, response, counter, false);
                min = number;
                counter++;
                checker();

            }else if( response.data = 'found it'){
                appender(div, number, response, counter, true);
                return;
            }
        })
        .catch(error=>{
            console.log(error);
        })
    };

    button.addEventListener("click", checker);
});
