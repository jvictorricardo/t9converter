//encodet9(string)
function encodet9(input){
    input = input.toLowerCase().normalize("NFD");

	let output = '';
    let keys = '';
    let teclas = [[' ', '0'], ['a','b','c','2'], ['d','e','f','3'],
	             ['g','h','i','4'], ['j','k','l','5'], ['m','n','o','6'],
                 ['p','q','r','s','7'], ['t','u','v','8'], ['w','x','y','z','9']];
	

    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < teclas.length; j++){
            for(let k = 0; k < teclas[j].length; k++){
                if(input[i]===teclas[j][k]){
                    /*
                        para facilitar o entendimento de letras da mesma tecla,
                        vou incluir o espaço, para palavras como acessível
                    */
                    keys = (j+1).toString().repeat(k+1);
                    //FALTA UMA CONDIÇÃO AQUI ÓÓÓ
                    keys += " ";
                    output += keys;
                    keys = '';
                }
            }
        }
    }

    output = output.trim();
    if(output.length>=1){
        //habilita o botão após mostrar o resultado
        document.getElementById("copy").setAttribute("class", "btn btn-primary w-30");
    }
	return output;
};

//decodet9(string)
function decodet9(input){
    /*  
        texto a ser convertido no formato de sequência de números separados por espaço
        sendo que em sequencias como "22 2 555 2" será traduzida como "bala" e 
        "22 2 5556 2" também será traduzida como "bala".
    */
	let teclas = [[' ', '0'], ['a','b','c','2'], ['d','e','f','3'],
	             ['g','h','i','4'], ['j','k','l','5'], ['m','n','o','6'],
                 ['p','q','r','s','7'], ['t','u','v','8'], ['w','x','y','z','9']];
    
	let letters = input.trim().split(" ");
	let output = '';
	
	for(let i=0; i<letters.length; i++){
		let pos1 = Number.parseInt(letters[i][0])-1;
		let pos2 = letters[i].length-1;
		if(pos1<0){
            pos1 = 0;//VERIFICAR O CASO PRA 0
        }
		output+=teclas[pos1][pos2];
	};

    if(output.length>=1){
        //habilita o botão após mostrar o resultado
        document.getElementById("copy").setAttribute("class", "btn btn-primary w-30");
    }
	
	return output;
}

const btn = document.getElementById("convert");
const btn2 = document.getElementById("copy");

btn.addEventListener('click', function() {
    if(document.querySelector('input[name="method"]:checked').value){    
        let input = document.getElementById("inputTF").value;
        let conversion = '';
        let result = document.querySelector('input[name="method"]:checked').value;
        
        if(result==="encrypt"){
            conversion = encodet9(input);
            if(conversion!=''){
                document.getElementById("resultTF").value = conversion;
            }
            else{
                alert("Algo de errado aconteceu! Tente novamente.")
            }
        }
        else if(result==="decrypt"){
            conversion = decodet9(input);
            if(conversion!=''){
                document.getElementById("resultTF").value = conversion;
            }
            else{
                alert("Algo de errado aconteceu! Tente novamente.")
            }
        }    
    }
    else{
        alert("Nenhuma opção foi selecionada!");
    }
        
});

btn.addEventListener('click', function() {
    var copyText = document.getElementById("resultTF");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);
});