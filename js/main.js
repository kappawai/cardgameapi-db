//Example fetch using pokemonapi.co
// let deckID=''

// if(!localStorage.getItem('deckIDStored')){
//   localStorage.setItem('deckIDStored',0)
// }

document.querySelector('#button1').addEventListener('click', drawDeck)

async function drawDeck(){
  const res1= await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  const data1= await res1.json() // parse response as JSON
  console.log(data1)
  let deckID=data1.deck_id
  const devNameS=this.parentNode.childNodes[3].innerText
      try{
        const res2= await fetch ('refreshDeck',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            devName:devNameS,
            cardDeckIDss:deckID
          })
        })
        const data2=await res2.json()
        console.log(data2)
        location.reload()
      }catch(err){
        console.error(err)
      }
}

// function drawDeck(){
//   fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => { 
//         console.log(data)
//         let deckID=data.deck_id
//         localStorage.setItem('deckIDStored',deckID)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

document.querySelector('#button2').addEventListener('click', drawTwo)

async function drawTwo(){
  let obtaindeckID=document.querySelector('#deckID').innerText
  const url = `https://deckofcardsapi.com/api/deck/${obtaindeckID}/draw/?count=2`
  const res=await fetch(url)
  const data=await res.json() // parse response as JSON
       try{
        console.log(data) 
        document.querySelector('#player1').src=data.cards[0].image    
        document.querySelector('#player2').src=data.cards[1].image   
        let player1Val=convertToNum(data.cards[0].value)
        let player2Val=convertToNum(data.cards[1].value)
        let player1suit=convertToNum1(data.cards[0].suit)
        let player2suit=convertToNum1(data.cards[1].suit)
        if(player1Val>player2Val){
          document.querySelector('h3').innerText='Player 1 Wins'
        }else if(player1Val<player2Val){
          document.querySelector('h3').innerText='Player 2 Wins'
        }else if(player1Val=player2Val){
          if(player1suit>player2suit){
            document.querySelector('h3').innerText='Player 1 Wins'
          }else if(player1suit<player2suit){
            document.querySelector('h3').innerText='Player 2 Wins'}
        }
      }catch(err){
          console.error(err)
      }
}

function convertToNum(val){
  if(val==='ACE'){
    return 14
  }else if(val==='KING'){
    return 13
  }else if(val==='QUEEN'){
    return 12
  }else if(val==='JACK'){
    return 11
  }else{
    return Number(val)
  }
}

function convertToNum1(suitPlay){
  if(suitPlay==='SPADES'){
    return 4
  }else if(suitPlay==='HEARTS'){
    return 3
  }else if(suitPlay==='CLUBS'){
    return 2
  }else if(suitPlay==='DIAMONDS'){
    return 1
}
}

// document.querySelector('#remove').addEventListener('click', removeDeck)

// function removeDeck(){
//   localStorage.removeItem('deckIDStored')
// }

// pwLbJmR11aLmSkT1ew1bV2a8nmMVjLv1j928OoWa