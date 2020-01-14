USE mapmarker;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE locale;
DROP TABLE location;
DROP TABLE localtype;
DROP TABLE websiteuser;
DROP TABLE rating;
DROP TABLE businessowner;
DROP TABLE admin;


CREATE TABLE location (
	town VARCHAR(20),
	state VARCHAR(20),
	country VARCHAR(20),
	PRIMARY KEY (town, state)
);

CREATE TABLE localtype(
	localtype VARCHAR(30),
	icon VARCHAR(50),
	PRIMARY KEY (localtype)
);

CREATE TABLE locale (
	x_coord DECIMAL (9,6),
	y_coord DECIMAL (9,6),
    localeName VARCHAR(255),
	address VARCHAR(255),
	town VARCHAR(20),
	state VARCHAR(30),
	email VARCHAR(100),
	telephone VARCHAR(30),
	website VARCHAR(100),
	rating VARCHAR(20),
	currentopen BOOLEAN,
	description TEXT(5000),
	localtype VARCHAR(30),
    picture VARCHAR(20),
	PRIMARY KEY (x_coord, y_coord),
	FOREIGN KEY (localtype)
		REFERENCES localtype(localtype),
	FOREIGN KEY (town, state)
		REFERENCES location(town, state)
);

SELECT '<info to display>' AS 'Up to this point';

CREATE TABLE websiteuser(
	userid VARCHAR(50),
	email VARCHAR(100),
	nomdeplum VARCHAR(50),
	password BIGINT,
	photo VARCHAR(50),
	PRIMARY KEY (userid, email)
);

CREATE TABLE rating(
	userid VARCHAR(50),
	x_coord DECIMAL (9,6),
	y_coord DECIMAL (9,6),
	recommended BOOLEAN,
	review TEXT,
	PRIMARY KEY(userid, x_coord, y_coord),
	FOREIGN KEY(userid)
		REFERENCES websiteuser(userid),
	FOREIGN KEY(x_coord, y_coord)
		REFERENCES locale(x_coord, y_coord)
);

CREATE TABLE businessowner(
	userid VARCHAR(50),
	x_coord DECIMAL (9,6),
	y_coord DECIMAL (9,6),
	owns BOOLEAN,
    PRIMARY KEY(userid, x_coord, y_coord),
	FOREIGN KEY(userid)
		REFERENCES websiteuser(userid),
	FOREIGN KEY(x_coord, y_coord)
		REFERENCES locale(x_coord, y_coord)
);

CREATE TABLE admin(
	userid VARCHAR(50),
	isadmin BOOLEAN,
    PRIMARY KEY(userid),
	FOREIGN KEY(userid)
		REFERENCES websiteuser(userid)
);

INSERT INTO websiteuser VALUES ('Master_User', 'david.sarkies@internode.on.net',
	'Master_User','00000000000','n/a');
INSERT INTO admin VALUES('Master_User',TRUE);

INSERT INTO localtype VALUES ('Airport','aeroplane.png');
INSERT INTO localtype VALUES ('Amusement','amusement-park.png');
INSERT INTO localtype VALUES ('Angkor Wat','angkor-wat.png');
INSERT INTO localtype VALUES ('Aquarium','narwhal.png');
INSERT INTO localtype VALUES ('Arc de Triomphe','arc-de-triomphe.png');
INSERT INTO localtype VALUES ('Astronomy','observatory.png');
INSERT INTO localtype VALUES ('Atomium','atomium.png');
INSERT INTO localtype VALUES ('Bakery','loaf.png');
INSERT INTO localtype VALUES ('Balls','march.png');
INSERT INTO localtype VALUES ('Beach','beach.png');
INSERT INTO localtype VALUES ('Bellfry','big-ben.png');
INSERT INTO localtype VALUES ('Billboard','billboard.png');
INSERT INTO localtype VALUES ('Bird','toucan.png');
INSERT INTO localtype VALUES ('Birdcage','bird-cage.png');
INSERT INTO localtype VALUES ('Boat','cruise.png');
INSERT INTO localtype VALUES ('Books','bookshelf.png');
INSERT INTO localtype VALUES ('Bottle Shop','wine-bottle.png');
INSERT INTO localtype VALUES ('Bridge','bridge.png');
INSERT INTO localtype VALUES ('Buddha','buddha.png');
INSERT INTO localtype VALUES ('Butterfly','butterfly.png');
INSERT INTO localtype VALUES ('Caeser','augustus-of-prima-porta.png');
INSERT INTO localtype VALUES ('Cafe','coffee.png');
INSERT INTO localtype VALUES ('Carpark','automobile.png');
INSERT INTO localtype VALUES ('Casino','roulette.png');
INSERT INTO localtype VALUES ('Castle','castle.png');
INSERT INTO localtype VALUES ('Cat','witch-cat.png');
INSERT INTO localtype VALUES ('Cave','cave.png');
INSERT INTO localtype VALUES ('Chair','chair.png');
INSERT INTO localtype VALUES ('Chedi','thailand.png');
INSERT INTO localtype VALUES ('Chemist','pharmacy.png');
INSERT INTO localtype VALUES ('Chinese Dragon','dragon.png');
INSERT INTO localtype VALUES ('Christmas Lights','lights.png');
INSERT INTO localtype VALUES ('Church','church.png');
INSERT INTO localtype VALUES ('City Gate','gate.png');
INSERT INTO localtype VALUES ('Cliff','cliff.png');
INSERT INTO localtype VALUES ('Clock','clock.png');
INSERT INTO localtype VALUES ('Clothing','suit.png');
INSERT INTO localtype VALUES ('Collectables','postage.png');
INSERT INTO localtype VALUES ('Computer','computer.png');
INSERT INTO localtype VALUES ('Container','container.png');
INSERT INTO localtype VALUES ('Convenience','shop.png');
INSERT INTO localtype VALUES ('Disneyland','disneyland-castle.png');
INSERT INTO localtype VALUES ('Eiffel Tower','eiffel-tower.png');
INSERT INTO localtype VALUES ('Flower','cinderpaschchilla.png');
INSERT INTO localtype VALUES ('Fountain','fountain.png');
INSERT INTO localtype VALUES ('Frieze','tapestry-design-made-by-indians-of-mexico.png');
INSERT INTO localtype VALUES ('Frog','frog.png');
INSERT INTO localtype VALUES ('Games','dices.png');
INSERT INTO localtype VALUES ('Gate','cemetery-gates.png');
INSERT INTO localtype VALUES ('Gun','cannon.png');
INSERT INTO localtype VALUES ('Hairdresser','scissors.png');
INSERT INTO localtype VALUES ('Harry Potter','harry-potter.png');
INSERT INTO localtype VALUES ('Health','hospital.png');
INSERT INTO localtype VALUES ('Hobbies','planes.png');
INSERT INTO localtype VALUES ('Hotel','bed.png');
INSERT INTO localtype VALUES ('Icecream Bar','ice-cream.png');
INSERT INTO localtype VALUES ('Jewels','crown.png');
INSERT INTO localtype VALUES ('Juice Bar','juice.png');
INSERT INTO localtype VALUES ('Lake','sea.png');
INSERT INTO localtype VALUES ('Laundromat','washing-machine.png');
INSERT INTO localtype VALUES ('Leaning Tower','leaning-tower-of-pisa.png');
INSERT INTO localtype VALUES ('Lego','blocks.png');
INSERT INTO localtype VALUES ('Lighthouse','lighthouse.png');
INSERT INTO localtype VALUES ('Lolly Shop','lollipop.png');
INSERT INTO localtype VALUES ('Lookout','lookout.png');
INSERT INTO localtype VALUES ('Lounge','lounge.png');
INSERT INTO localtype VALUES ('Market','stall.png');
INSERT INTO localtype VALUES ('Railway Market','steam.png');
INSERT INTO localtype VALUES ('Floating Market','thailand-1.png');
INSERT INTO localtype VALUES ('Memorial','memorial.png');
INSERT INTO localtype VALUES ('Mirror','mirror.png');
INSERT INTO localtype VALUES ('Monkey','monkey.png');
INSERT INTO localtype VALUES ('Monument','obelisk.png');
INSERT INTO localtype VALUES ('Museum','exhibition.png');
INSERT INTO localtype VALUES ('Palace','royal-palace.png');
INSERT INTO localtype VALUES ('Park','forest.png');
INSERT INTO localtype VALUES ('Parlaiment House','parlaiment.png');
INSERT INTO localtype VALUES ('Pig','pig.png');
INSERT INTO localtype VALUES ('Plaza','st-peters-square.png');
INSERT INTO localtype VALUES ('Professional','briefcase.png');
INSERT INTO localtype VALUES ('Pub/Bar','beers.png');
INSERT INTO localtype VALUES ('Public Transport Station','platform.png');
INSERT INTO localtype VALUES ('Purse','purses.png');
INSERT INTO localtype VALUES ('Records','turntable.png');
INSERT INTO localtype VALUES ('Restaurant, American','burger.png');
INSERT INTO localtype VALUES ('Restaurant, Asian','noodles.png');
INSERT INTO localtype VALUES ('Restaurant, European','wiener-schnitzel.png');
INSERT INTO localtype VALUES ('Restaurant, French','croissant.png');
INSERT INTO localtype VALUES ('Restaurant, Indian','curry.png');
INSERT INTO localtype VALUES ('Restaurant, Italian','pizza.png');
INSERT INTO localtype VALUES ('Restaurant, Mexican','burrito.png');
INSERT INTO localtype VALUES ('Restaurant, Middle Eastern','kebab.png');
INSERT INTO localtype VALUES ('Restaurant, Seafood','lobster.png');
INSERT INTO localtype VALUES ('Restaurant, Takeaway','fast-food.png');
INSERT INTO localtype VALUES ('Rock','stone.png');
INSERT INTO localtype VALUES ('Rocking Horse','rocking-horse.png');
INSERT INTO localtype VALUES ('Roman Forum','forum.png');
INSERT INTO localtype VALUES ('Rotunda','rotunda.png');
INSERT INTO localtype VALUES ('Ruins Building','ruin-building.png');
INSERT INTO localtype VALUES ('Ruins Castle','ruincastle.png');
INSERT INTO localtype VALUES ('Ruins City','machu-picchu.png');
INSERT INTO localtype VALUES ('Ruins Factory','factory.png');
INSERT INTO localtype VALUES ('Ruins Stupa','phra-pathommachedi.png');
INSERT INTO localtype VALUES ('Ruins Temple','ruinstemple.png');
INSERT INTO localtype VALUES ('Ruins Theatre','amphitheatre.png');
INSERT INTO localtype VALUES ('Shell','sea-snail.png');
INSERT INTO localtype VALUES ('Shopping Centre','goods.png');
INSERT INTO localtype VALUES ('Sphinx','sphinx.png');
INSERT INTO localtype VALUES ('Stadium','stadium.png');
INSERT INTO localtype VALUES ('Star','star.png');
INSERT INTO localtype VALUES ('Star Wars','lightsaber.png');
INSERT INTO localtype VALUES ('Statue','statue.png');
INSERT INTO localtype VALUES ('Stonehenge','stonehenge.png');
INSERT INTO localtype VALUES ('Tank','tank.png');
INSERT INTO localtype VALUES ('Tardis','tardis.png');
INSERT INTO localtype VALUES ('Temple','Wat-phrakaew.png');
INSERT INTO localtype VALUES ('Theatre/Cinema','theater.png');
INSERT INTO localtype VALUES ('Toilet','wc.png');
INSERT INTO localtype VALUES ('Tomb','tombstone.png');
INSERT INTO localtype VALUES ('Tour','tour.png');
INSERT INTO localtype VALUES ('Tower','invercargill.png');
INSERT INTO localtype VALUES ('Trail','trail.png');
INSERT INTO localtype VALUES ('Tree','banyan.png');
INSERT INTO localtype VALUES ('Trough','trough.png');
INSERT INTO localtype VALUES ('Tunnel','roadtunnel.png');
INSERT INTO localtype VALUES ('Variety','sale.png');
INSERT INTO localtype VALUES ('Wharf','pier.png');
INSERT INTO localtype VALUES ('Windmill','windmill.png');
INSERT INTO localtype VALUES ('Zoo','rhino.png');
INSERT INTO localtype VALUES ('Zoo, Elephant','wild-life.png');
INSERT INTO localtype VALUES ('Zoo, Tiger','tiger.png');




