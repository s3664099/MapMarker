#include <iostream>
#include <stdlib.h>

#include "mysql_connection.h"
#include "mysql_driver.h"
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

using std::cout;
using std::endl;

#define EXIT_SUCCESS 0

int main(void) {

	cout<<"running 'SELECT' in database"<<endl;

	int number = 0;

	try {
		sql::Driver *driver;
		sql::Connection *con;
		sql::Statement *stmt;
		sql::ResultSet *res;

		driver = sql::mysql::get_driver_instance();
		con = driver->connect("tcp://127.0.0.1:3306", "root","root");
		con->setSchema("mapmarker");

		stmt = con->createStatement();
		res = stmt->executeQuery("SELECT * FROM locale");

		while(res->next()) {
			number++;
			cout<<"\t... MySQL replies: "<<number<<") ";
			cout<<res->getString(3)<<" "<<res->getString(1)<<","<<res->getString(2)<<endl;

		}

		delete res;
		delete stmt;
		delete con;
	} catch (sql::SQLException &e) {
		cout<<"# ERR: SQLException in " <<__FILE__;
		cout<<"("<<__FUNCTION__<<") on line "<<__LINE__ <<endl;
		cout<<"# ERR: "<<e.what();
		cout<<"(MySQL error code: "<< e.getErrorCode();
		cout<<", SQLState: "<<e.getSQLState()<<" )"<<endl;
	}

	cout<< endl;

	return EXIT_SUCCESS;
	
}