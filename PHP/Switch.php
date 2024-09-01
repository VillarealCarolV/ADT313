<?php
echo "Switch Statement";

$role = "Student";
switch ($role) {
    case 'Student':
        echo "You are a student, you are not allowed to access...";
        break;

    case 'instructor':
        echo "Instructor, you have limited access to...";
        break;

    case 'admin':
        echo "Admin, you have full access too...";
        break;

    default:
        echo "who are you?";
        # code...
        break;



}
?>