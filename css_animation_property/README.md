``` html
초기값
       
           animation-name: none (이 애니메이션의 중간 상태를 지정합니다. 중간 상태는  @keyframes 규칙을 이용하여 기술합니다.)
           animation-duration: 0s  (한 사이클을 완료하는 데 걸리는 시간을 지정)
           animation-timing-function: ease (한 사이클동안 에니메이션이 어떻게 진행되어야 하는지 지정)
           animation-delay: 0s (애니메이션이 시작되어야 하는 시기를 지정)
           animation-iteration-count: 1 (에니메이션 지정 횟수)
           animation-direction: normal (앞뒤로진행할지 번갈아가면서 진행할지 지정)
           animation-fill-mode: forwards ( 마지막 움직임의 스타일이 유지됨)
           animation-play-state: running (에니메이션을 중지 또는 실행 등 지정할수있고 , 에니메이션이 끝나고 난후 어떤 값이 적용될지 지정한다.)    
           
           예) http://jsfiddle.net/77zkj4yk/4/
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

       <h2>animation-timing-function property</h2>
       <p>
           /* Keyword values */<br/>
           animation-timing-function: ease; <br/>
           animation-timing-function: ease-in;<br/>
           animation-timing-function: ease-out;<br/>
           animation-timing-function: ease-in-out;<br/>
           animation-timing-function: linear;<br/>
           animation-timing-function: step-start;<br/>
           animation-timing-function: step-end;<br/>
           <br/>
           /* Function values */<br/>
           animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);<br/>
           animation-timing-function: steps(4, end);<br/>
           animation-timing-function: frames(10);<br/>
           <br/>
           /* Multiple animations */<br/>
           animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);<br/>
           <br/>
           /* Global values */<br/>
           animation-timing-function: inherit;<br/>
           animation-timing-function: initial;<br/>
           animation-timing-function: unset;<br/>
       </p>

       <h2>animation-direction property</h2>
       <p>
           /* Single animation */<br/>
           animation-direction: normal;<br/>
           animation-direction: reverse;<br/>
           animation-direction: alternate;<br/>
           animation-direction: alternate-reverse;<br/>
           <br/>
           /* Multiple animations */<br/>
           animation-direction: normal, reverse;<br/>
           animation-direction: alternate, reverse, normal;<br/>
           <br/>
           /* Global values */<br/>
           animation-direction: inherit;<br/>
           animation-direction: initial;<br/>
           animation-direction: unset;<br/>
       </p>

       <h2>animation-duration property</h2>
       <p>
           /* Single animation */<br/>
           animation-duration: 6s;<br/>
           animation-duration: 120ms;<br/>
           <br/>
           /* Multiple animations */<br/>
           animation-duration: 1.64s, 15.22s;<br/>
           animation-duration: 10s, 35s, 230ms;<br/>
       </p>

       <h2>animation-fill-mode property</h2>
       <p>
           /* Single animation */<br/>
           animation-fill-mode: none;<br/>
           animation-fill-mode: forwards;<br/>
           animation-fill-mode: backwards;<br/>
           animation-fill-mode: both;<br/>
           <br/>
           /* Multiple animations */<br/>
           animation-fill-mode: none, backwards;<br/>
           animation-fill-mode: both, forwards, none;<br/>
       </p>
       <h2>animation-play-state property</h2>
       <p>
           /* Single animation */<br/>
           animation-play-state: running;<br/>
           animation-play-state: paused;<br/>
           <br/>
           /* Multiple animations */<br/>
           animation-play-state: paused, running, running;<br/>
           <br/>
           /* Global values */<br/>
           animation-play-state: inherit;<br/>
           animation-play-state: initial;<br/>
           animation-play-state: unset;<br/>
       </p>
       <h2>animation-iteration-count property</h2>
       <p>
           /* Keyword value */<br/>
           animation-iteration-count: infinite;<br/>
           <br/>
           /*  numbe  values */<br/>
           animation-iteration-count: 3;<br/>
           animation-iteration-count: 2.4;<br/>
           <br/>
           /* Multiple values */<br/>
           animation-iteration-count: 2, 0, infinite;<br/>
       </p>
   </div>

</body>
</html>



