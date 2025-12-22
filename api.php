<?php 
	error_reporting(0);
	date_default_timezone_set("Asia/Calcutta");   //India time (GMT+5:30)
	
	
	$link = mysqli_connect('localhost','scientif_ibees','0A}IyQL7P4u%') or die('Cannot connect to the DB');
	mysql_select_db('scientif_ibees',$link) or die('Cannot select the DB');
	
$servername = "localhost";	
$username = "digitalfueled_shiva";
$password = "AabAZO}VLQg^";
$dbname = "digitalfueled_shiva";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
	

	
	
	if (!empty($_POST))
	{	
   
		//getPackages
		if($data['method']=="getProduct")
		{
			
			
			$sql="select * from df_products where status='1' order by ordering ASC";
						
            $result = mysqli_query($conn, $sql);
			
			$n=mysql_num_rows($result);
			if($n=='0')
			{
				//Not found Health Tips related to search
				$json = array("status" => 500, "message" => "Error Occurred, Please try again later.");
			}
			else
			{
				
				$i=0;
				while($b=mysql_fetch_array($result))
				{													
					
					/*$josnProduct[] = array("id" =>$b['id'], "category_id" => $b['category_id'],   "product_name" => $b['product_name'],  "product_description" => $b['product_description'],  "short_description" => $b['short_description'],  "product_specs" => $b['product_specs'], "thumb_image" => $b['thumb_image'], "big_image" => $b['big_image'], "seo_title" => $b['seo_title'], "seo_keywords" => $b['seo_keywords'], "seo_description" => $b['seo_description'] );*/
					print_r($b);
					exit;
					
				}
				
				
				$json = array("status" => 200, "message" => "Success" , "packages" => $josnProduct);
				
				
				
			}	
			
		}
		



		//end api
	}
	else
	{
		$json = array("status" => 400, "message" => "Post value accepted only.");
	}
	header('Content-type: application/json');
	echo json_encode($json);
	mysqli_close($conn);
	
?>			