import MySQLdb

hostname = 'localhost'
username = 'root'
password = 'root'
database = 'mapmarker'
datafile = 'places.txt'

def clearDatabases(conn):
	cur = conn.cursor()

	conn.set_character_set('utf8')
	cur.execute('SET NAMES utf8')
	cur.execute('SET CHARACTER SET utf8')
	cur.execute('SET character_set_connection=utf8')
	
	cur.execute("SET FOREIGN_KEY_CHECKS = 0")
	
	try:
		cur.execute("DROP TABLE locale")
	except:
		print("No such table as locale")

	try:
		cur.execute("DROP TABLE location")
	except:
		print("No such table as location")

	try:
		cur.execute("DROP TABLE localtype")
	except:
		print("No such table as localtype")

	try:
		cur.execute("DROP TABLE websiteuser")
	except:
		print("No such table as websiteuser")

	try:
		cur.execute("DROP TABLE rating")
	except:
		print("No such table as rating")

	try:
		cur.execute("DROP TABLE businessowner")
	except:
		print("No such table as businessowner")

	try:
		cur.execute("DROP TABLE admin")
	except:
		print("No such table as admin")

def createTables(conn):
	cur = conn.cursor()

	try:
		cur.execute("CREATE TABLE location (town VARCHAR(20), state VARCHAR(20), country VARCHAR(20), PRIMARY KEY (town, state))")
	except:
		print("Table location already exists")

	try:
		cur.execute("CREATE TABLE localtype(localtype VARCHAR(30), icon VARCHAR(50), PRIMARY KEY (localtype))")	
	except:
		print("Table localtype already exists")

	try:	
		cur.execute("CREATE TABLE locale (x_coord DECIMAL (9,6), y_coord DECIMAL (9,6), localeName VARCHAR(255), address VARCHAR(255), town VARCHAR(20), state VARCHAR(30), email VARCHAR(100), telephone VARCHAR(30), website VARCHAR(100), rating VARCHAR(20), currentopen BOOLEAN, description TEXT(5000), localtype VARCHAR(30), picture VARCHAR(20), PRIMARY KEY (x_coord, y_coord), FOREIGN KEY (localtype) REFERENCES localtype(localtype), FOREIGN KEY (town, state) REFERENCES location(town, state))")
	except:
		print("Table locale already exists")

	try:
		cur.execute("CREATE TABLE websiteuser(userid VARCHAR(50), email VARCHAR(100), nomdeplum VARCHAR(50), password BIGINT, photo VARCHAR(50), PRIMARY KEY (userid, email))")
	except:
		print("Table userid already exists")

	try:
		cur.execute("CREATE TABLE rating (userid VARCHAR(50), x_coord DECIMAL (9,6), y_coord DECIMAL (9,6), recommended BOOLEAN, review TEXT, PRIMARY KEY(userid, x_coord, y_coord), FOREIGN KEY(userid) REFERENCES websiteuser(userid), FOREIGN KEY(x_coord, y_coord) REFERENCES locale(x_coord, y_coord))")
	except:
		print("Table rating already exists")

	try:
		cur.execute("CREATE TABLE businessowner(userid VARCHAR(50), x_coord DECIMAL (9,6), y_coord DECIMAL (9,6), owns BOOLEAN, PRIMARY KEY(userid, x_coord, y_coord), FOREIGN KEY(userid) REFERENCES websiteuser(userid), FOREIGN KEY(x_coord, y_coord) REFERENCES locale(x_coord, y_coord))")
	except:
		print("Table businessowner already exists")

	try:
		cur.execute("CREATE TABLE admin(userid VARCHAR(50), isadmin BOOLEAN, PRIMARY KEY(userid), FOREIGN KEY(userid) REFERENCES websiteuser(userid))")
	except:
		print("Table admin already exists")


def loadDataFile(conn):

	cur = conn.cursor()
	file = open(datafile,'r')

	userId = "Master_User"

	try:
		cur.execute("INSERT INTO websiteuser VALUES ('"+userId+"', 'david.sarkies@internode.on.net','Master_User','00000000000','n/a')");
	except MySQLdb.Error as e:
		print(str(number)+") Error: "+str(e))

	try:
		cur.execute("INSERT INTO admin VALUES ('"+userId+"','1')")
	except MySQLdb.Error as e:
		print(str(number)+") Error: "+str(e))

	number = 0

	for line in file:

		line = line.replace("'","''")
		fields = line.split("\t")

		if fields[0] != "name" and fields[1] !="address":

			try:
				cur.execute("INSERT INTO localtype VALUES ('"+fields[10]+"','"+fields[11]+"')");
			except:
				i=1

			try:
				cur.execute("INSERT INTO location VALUES ('"+fields[2]+"','"+fields[3]+"','"+fields[4]+"')");
				number+=1
			except MySQLdb.Error as e:
				number+=1
				#print(str(number)+") Error: "+str(e))

			x_coord = fields[7]
			y_coord = fields[8]	

			try:
				if (fields[12] == "Y"):
					fields[12] = "1"
				elif (fields[12] == "N"):
					fields[12] = "0"
				cur.execute("INSERT INTO locale(localename,x_coord,y_coord, address, town, state, telephone, website, currentopen, localtype ) VALUES ('"+fields[0]+"','"+x_coord+"','"+y_coord+"','"+fields[1]+"','"+fields[2]+"','"+fields[3]+"','"+fields[5]+"','"+fields[6]+"','"+fields[12]+"','"+fields[10]+"')")
			except MySQLdb.Error as e:
				print(str(number)+") Error: "+str(e))
				i=1

			rating = fields[9]
			review = fields[13]

			if (rating == 1 or rating == 2):
				rating = "0"
			elif (rating == 4 or rating == 5):
				rating == "1"
			else:
				rating = "NaN"

			try:
				if(rating == "NaN"):
					cur.execute("INSERT INTO rating(userid, x_coord, y_coord, review)VALUES ('"+userId+"','"+x_coord+"','"+y_coord+"','"+(review)+"')")
				else:
					cur.execute("INSERT INTO rating(userid, x_coord, y_coord, recommended, review) VALUES ('"+userId+"','"+x_coord+"','"+y_coord+"','"+rating+"','"+review+"')")
			except MySQLdb.Error as e:
				print(str(number)+") Error: "+str(e))

		conn.commit()

		

def testQuery(conn):
	cur = conn.cursor()

	try:
		cur.execute("SHOW TABLES")

		for table in cur.fetchall():
			print(table)
	except:
		print("Error")

	try:
		cur.execute("SELECT localename, x_coord, y_coord FROM locale")

		number=0

		#print(cur.fetchall())

		for localename, x_coord, y_coord in cur.fetchall():
			number+=1
			print(str(number)+") "+localename+" "+str(x_coord)+","+str(y_coord))
	except:
		print("Tables not in existence")

	cur.execute("SELECT * FROM websiteuser")
	print(cur.fetchall())

	cur.execute("SELECT * FROM admin")
	print(cur.fetchall())

myConnection = MySQLdb.connect(host=hostname, user = username, passwd = password, db = database)

clearDatabases(myConnection)
createTables(myConnection)
loadDataFile(myConnection)
testQuery(myConnection)
myConnection.close()


