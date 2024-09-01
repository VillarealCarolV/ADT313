<?php

echo "conditional Statement <br> ";

$showVariable = true;
$name = "Carol <br>";
if($showVariable == true){
    //execute code
    echo $name;
} elseif($showVariable && $name == 'carol' && $auth){
   echo " Not Carol";
} elseif($showVariable && $name){ 
    echo "Hello ".$name;
 }
else{
 echo "else statement <br>";
}


$AnotherVariable=  ($showVariable == true) ? $name : "villareal : Wrong" ;
echo $AnotherVariable;

//DON'T 
// $AnotherVariable=  ($showVariable == true) ? (showVariable) ? $name : "villareal : Wrong" ;


?>