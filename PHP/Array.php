<?php
echo "array <br> ";

$cars = array("volvo,", "bmw", "toyota");
// echo $cars[1];

$userInformation = array(
    "firstname" => "Carol <br>",
    "lastname" => "Villareal <br>",
    "role" => "admin <br>"
);

//add value
$userInformation["address"] = 'bocaue <br>';
$userInformation[] = '097567456463 <br>';

// echo $userInformation['role <br>'];
print_r($userInformation);

echo "<br>";
var_dump($userInformation);

echo "<br>";

//multi dimentional array
$user = array(
    "information" => array(
        "carol",
        "lastname" => "villareal",
    ),
    "roles" => array(
        "instructor",
        "student"
    ),
    "address" => array(
        "province" => "bulacan",
        "municipality" => "bocaue",
        "city" => "new town"
    )
);

 echo $user ['address']['province'];
 

?>