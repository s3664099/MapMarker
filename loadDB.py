import MySQLdb

hostname = 'localhost'
username = 'root'
password = 'root'
database = 'mapmarker'

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

		for localename, x_coord, y_coord in cur.fetchall():
			number+=1
			print(str(number)+") "+localename+" "+str(x_coord)+","+str(y_coord))
	except:
		print("Tables not in existence")


	cur.execute("SELECT * FROM websiteuser")
	print(cur.fetchall())

	cur.execute("SELECT * FROM admin")
	print(cur.fetchall())

	try:
		cur.execute("SELECT review, recommended FROM rating")

		number=0

		for review, recommended in cur.fetchall():
			number+=1
			print(str(number)+") "+str(recommended)+" "+str(review))
	except:
		print("Tables not in existence")

myConnection = MySQLdb.connect(host=hostname, user = username, passwd = password, db = database)
testQuery(myConnection)
myConnection.close()

