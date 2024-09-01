
<h1>
    <?php
    $table = array(
        "header" => array(
            "Firstname",
            "Middlename",
            "Lastname",
            "Section",
            "Course",
            "YearLevel"
        ),
        "body" => [
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
            array(
                "firstname" => "Firstname",
                "middlename" => "Middlename",
                "lastname" => "Lastname",
                "section" => "Section",
                "course" => "Course",
                "yearlevel" => "YearLevel"
            ),
        ],

    );

    



        ?>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}


</style>

<table border="1">
    <thead>
        <tr>
            <th>STUDENT ID</th>
            <?php
           
            foreach ($table['header'] as $header) {
                echo "<th>{$header}</th>";
            }
            ?>
        </tr>
    </thead>
    <tbody>
        <?php
        
        $studentId = 1;

        
        foreach ($table['body'] as $row) {
            echo "<tr>";
            
            echo "<td>{$studentId}</td>";

            
            foreach ($row as $cell) {
                echo "<td>{$cell}</td>";
            }
            echo "</tr>";

            
            $studentId++;
        }
        ?>
    </tbody>
</table>


</h1>