## 초기값

``` html
   animation-name: none (이 애니메이션의 중간 상태를 지정합니다. 중간 상태는  @keyframes 규칙을 이용하여 기술합니다.)
   animation-duration: 0s  (한 사이클을 완료하는 데 걸리는 시간을 지정)
   animation-timing-function: ease (한 사이클동안 에니메이션이 어떻게 진행되어야 하는지 지정)
   animation-delay: 0s (애니메이션이 시작되어야 하는 시기를 지정)
   animation-iteration-count: 1 (에니메이션 지정 횟수)
   animation-direction: normal (앞뒤로진행할지 번갈아가면서 진행할지 지정)
   animation-fill-mode: forwards ( 마지막 움직임의 스타일이 유지됨)
   animation-play-state: running (에니메이션을 중지 또는 실행 등 지정할수있고 , 에니메이션이 끝나고 난후 어떤 값이 적용될지 지정한다.)    

   예) http://jsfiddle.net/77zkj4yk/4/
    div{
      position:relative;
      width:100px;height:100px;text-align:center;background: red;
      -webkit-animation-name: slidein; /* Chrome, Safari, Opera */
      -webkit-animation-duration: 2s; /* Chrome, Safari, Opera */
      -webkit-animation-delay: 2s; /* Chrome, Safari, Opera */
      -webkit-animation-direction : normal;
      -webkit-animation-play-state : play;
      animation-name: slidein;
      animation-duration: 2s;
      animation-delay: 2s;
      animation-direction : normal;
      animation-play-state : play;
    }
   
    @keyframes slidein {
       from {
           margin-left: 100%;
           width: 300%;
       }

       to {
           margin-left: 0%;
           width: 100%;
       }
    }
```

### animation-timing-function property

``` html
    <Keyword values> 
        animation-timing-function: ease; 
        animation-timing-function: ease-in;
        animation-timing-function: ease-out;
        animation-timing-function: ease-in-out;
        animation-timing-function: linear;
        animation-timing-function: step-start;
        animation-timing-function: step-end;

    <Function values>
        animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
        animation-timing-function: steps(4, end);
        animation-timing-function: frames(10);

    <Multiple animations>
        animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

    <Global values>
        animation-timing-function: inherit;
        animation-timing-function: initial;
        animation-timing-function: unset;

```
    
### animation-direction property

``` html
    <Single animation> 
        animation-direction: normal;
        animation-direction: reverse;
        animation-direction: alternate;
        animation-direction: alternate-reverse;

    <Multiple animations> 
        animation-direction: normal, reverse;
        animation-direction: alternate, reverse, normal;

    <Global values>
        animation-direction: inherit;
        animation-direction: initial;
        animation-direction: unset;
```
            
      
### animation-duration property

``` html
    <Single animation>
        animation-duration: 6s;
        animation-duration: 120ms;

    <Multiple animations>
        animation-duration: 1.64s, 15.22s;
        animation-duration: 10s, 35s, 230ms;

```

### animation-fill-mode property
      
``` html
    <Single animation>
        animation-fill-mode: none;
        animation-fill-mode: forwards;
        animation-fill-mode: backwards;
        animation-fill-mode: both;

    <Multiple animations>
        animation-fill-mode: none, backwards;
        animation-fill-mode: both, forwards, none;
```
      
      
### animation-play-state property      
       
``` html
    <Single animation> 
        animation-play-state: running;
        animation-play-state: paused;

    <Multiple animations> 
        animation-play-state: paused, running, running;

    <Global values>
        animation-play-state: inherit;
        animation-play-state: initial;
        animation-play-state: unset;
```
       
### animation-iteration-count property

``` html
    <Keyword value> 
        animation-iteration-count: infinite;

    <numbe  values> 
        animation-iteration-count: 3;
        animation-iteration-count: 2.4;

    <Multiple values> 
        animation-iteration-count: 2, 0, infinite;

```



