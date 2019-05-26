$(document).ready(function(){
      // Your web app's Firebase configuration
      
const friendsLink= document.getElementById("friends_link");
const welcomeMessage=document.getElementById("welcome_message");
    const gamesLink= document.getElementById("games_link");
    $("#login_page").show();
    let user;
    $("#main_page").hide()
    const JSState = {
        loginPage:function(){
    const userdatabase = firebase.database().ref("users");
    const loginPassword=document.getElementById("password");
    const loginUsername=document.getElementById("username");
    const mainForm=document.getElementById("main_form");
    const loginButton = document.getElementById("login_button");
    const loginTitle = document.getElementById("login_title");
    const usernameLabel = document.getElementById("username_label");
    const passwordLabel = document.getElementById("password_label");
    const CAButton = document.getElementById("create_account_button");
    let confirmDiv=document.createElement("div");
    let confirmPassword= document.createElement("input");
    let confirmPasswordLabel= document.createElement("label")
    let logins=[];
    let passwords=[];
    userdatabase.on('child_added',addArrays);
    function addArrays(response){
        logins.push(response.val().user);
        passwords.push(response.val().password);
        
    }
    loginButton.addEventListener('click', checkLogin);
    function checkLogin(e){
        
        e.preventDefault();
        usertemp=loginUsername.value;
        passwordtemp=loginPassword.value;
        
        loginPassword.value="";
        if(logins.indexOf(usertemp)!=-1&&passwords[logins.indexOf(usertemp)]==passwordtemp){
            console.log("working");
            user=loginUsername.value;
            $("#login_page").hide();
            $("#main_page").show();
            welcomeMessage.innerHTML=`Welcome ${user} to the more improved design of Manarobe games.Enjoy our games and messaging board More games to come in the future. Highscores and Friend Competitive play to come in the future. Almost 80% of bugs are fixed by refresh. For persistent bugs, click the copyRight symbol below. Enjoy your stay and this amazing pic of Phil the llama.`
        }
    }
    
    CAButton.addEventListener('click',addNewAccount);
    function addNewAccount(e){
        e.preventDefault();
        loginTitle.innerHTML="Create Account";
        passwordLabel.innerHTML="New Password : ";
        usernameLabel.innerHTML="New Username : ";
        mainForm.removeChild(loginButton);
        mainForm.removeChild(CAButton);
        confirmPassword.type="password";
        confirmPasswordLabel.innerHTML="Confirm New Password : ";
        confirmPasswordLabel.htmlFor="confirmPassword";
        confirmDiv.appendChild(confirmPasswordLabel);
        confirmDiv.appendChild(confirmPassword);
        mainForm.appendChild(confirmDiv);
        let SAButton= document.createElement("button");
        SAButton.innerHTML="Submit new Account";
        mainForm.appendChild(SAButton);
    
    
        SAButton.addEventListener('click', SubmitNewAccount);
    
    }
    function SubmitNewAccount(e){
        e.preventDefault();
        if(loginPassword.value!=confirmPassword.value){
            alert("You're passwords do not match.");
            loginPassword.value="";
            confirmPassword.value="";
        }
        else if(logins.includes(loginUsername.value)===true){
            alert("You're username is already taken.");
            loginUsername.value="";
    
        }
        else{
            let newUser={
                user:loginUsername.value,
                password:loginPassword.value
            }
            userdatabase.push(newUser)
            user=loginUsername.value;
            $("#login_page").hide();
            $("#main_page").show();
            welcomeMessage.innerHTML=`Welcome ${user} to the second more improved design of Manarobe games. Enjoy our games and messaging board. More games to come in the future. Highscores, Friend and, Competitive play also to come in the future. Almost 80% of bugs are fixed by refresh. For persistent bugs, click the copyRight symbol below. Enjoy your stay and this amazing pic of Phil the llama.`
        }
    
    }
    },
    friendsPage:function(){
    const messdatabase = firebase.database().ref("messages");
    const messageElement = document.getElementById("message_input");
    const button = document.getElementById("message_submit");
    button.addEventListener("click",updateDB);
    const messageBoard = document.getElementById("past_message_container");

//Set database object here
/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const message = messageElement.value;
   
    messageElement.value  = "";
    const userData={
        user: user,
        messages: message
    }
    
    //Update database here
        messdatabase.push(userData);
        
    }

    // Set database "child_added" event listener here
    messdatabase.on("child_added", displayMessage);
    function displayMessage(rowData){
        const row = rowData.val();
    
        const myMessage= document.createElement("div");
        myMessage.innerHTML=`${row.user}: ${row.messages}`;
        messageBoard.appendChild(myMessage);
    }
    }
    }
    JSState.loginPage();
    $("#friend_container").hide();
    $("#games_container").hide();
    friendsLink.addEventListener("click",(e)=>{
        e.preventDefault();
        $("#default_container").hide();
        $("#friend_container").show();
        $("#games_container").hide();
        JSState.friendsPage();
    });
    gamesLink.addEventListener("click",(e)=>{
        window.addEventListener("keydown", function(e) {
            // space and arrow keys
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
        e.preventDefault();
        $("#games_container").show();
        $("#default_container").hide();
        $("#friend_container").hide();
    });

    
});