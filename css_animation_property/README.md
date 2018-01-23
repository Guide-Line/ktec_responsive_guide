``` html
�ʱⰪ
       
           animation-name: none (�� �ִϸ��̼��� �߰� ���¸� �����մϴ�. �߰� ���´�  @keyframes ��Ģ�� �̿��Ͽ� ����մϴ�.)
           animation-duration: 0s  (�� ����Ŭ�� �Ϸ��ϴ� �� �ɸ��� �ð��� ����)
           animation-timing-function: ease (�� ����Ŭ���� ���ϸ��̼��� ��� ����Ǿ�� �ϴ��� ����)
           animation-delay: 0s (�ִϸ��̼��� ���۵Ǿ�� �ϴ� �ñ⸦ ����)
           animation-iteration-count: 1 (���ϸ��̼� ���� Ƚ��)
           animation-direction: normal (�յڷ��������� �����ư��鼭 �������� ����)
           animation-fill-mode: forwards ( ������ �������� ��Ÿ���� ������)
           animation-play-state: running (���ϸ��̼��� ���� �Ǵ� ���� �� �����Ҽ��ְ� , ���ϸ��̼��� ������ ���� � ���� ������� �����Ѵ�.)    
           
           ��) http://jsfiddle.net/77zkj4yk/4/
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



