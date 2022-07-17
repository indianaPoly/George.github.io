const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "toDos";

let toDos = [];
// const로 하게 된다면 계속해서 빈 배열을 사용할 것이기 떄문에 값을 저장하고 새로고침
// 한 뒤에 다시 To do를 작성하게 된다면 로컬스토리지에 추가되는 새로운 값이 기본 값을
// 덮는 현상이 발생한다. 이를 방지하기 위해서 배열의 타입을 let으로 하였고, 기존의
// 값은 추가하는 방식으로 해결한다. -> 추가하는 코드는 밑에 있음 

function deleteToDo(event){
    // 버튼을 만들게 되었을 경우에 각각의 버튼이 따로 행동하는 것이 아니라 동일하게
    // 행동하고 있음을 알고 있어야 한다. 그래서 버튼이 눌리는 상황(event)에서
    // 이벤트에 관련된 값 중 버튼의 부모를 가져와 이를 지운다.
    // 이렇게 하면 버튼들의 부모들은 각각 다르기 때문에 내가원하는 방향으로 작성을
    // 할 수 있다.
    const li = event.target.parentElement;
    li.remove();
    // local storage에 저장을 하고 난 뒤에 삭제를 하여도 새로고침을 하면 다시 돌아왔다
    // 이를 해결하기 위해서 local storage의 값을 최신화를 시켜줘야 하는데
    // 이때 storage의 id값을 제외하고 새로운 배열을 만드는 방법으로 접근하면 된다.
    // filter function을 통해서 이를 구현할 수 있다.
    // true를 반환하면 그 값이 배열에 남아있고 false이면 제외한다
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function paintToDo(newToDo){
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerHTML = newToDo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handletoDoInput(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text:newToDo,
        id: Date.now(),
        // 위 코드는 우리에게 랜덤한 숫자를 줄거임.
    }
    //오브젝트에 아이디를 추가해줌에 따라서 데이터베이스의 내용을 삭제할 수 있음.
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handletoDoInput);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    //각각의 아이템에 대해서 무엇을 실행할 것인지? forEach
    parsedToDos.forEach(paintToDo);
}