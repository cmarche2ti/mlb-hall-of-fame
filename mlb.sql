-- Position Player table where stats are aggregated

SELECT 
    B.playerID, 
    COUNT(1) as Seasons, 
    SUM(B.H) as Hits, 
    SUM(B.RBI) as RBIs,
    SUM(B.R) as Runs,
    SUM(B.SB) as Stolen_Bases,
    SUM(B.SO) as Strike_Outs,
    SUM(B.HR) as Home_Runs,
    SUM(B.BB) as Walks,
    SUM(B.G) as Games,
    SUM(B."3B") as Triples,
    SUM(B."2B") as Doubles,
    SUM(B.CS) as Caught_Stealing,
    SUM(B.AB) as At_Bats,
    SUM(B.IBB) as Intentional_Walks,
    SUM(B.HBP) as Hit_By_Pitch,
    SUM(B.SH) as Sacrifice_Hits,
    SUM(B.SF) as Sacrifice_Flies,
    SUM(B.GIDP) as Ground_Into_Double_Plays  
FROM Batting as B
GROUP BY B.playerID

-- Players Demographic Info

SELECT playerID, nameFirst, nameLast, weight, height, bats, throws, finalGame
FROM People

-- Hall of Fame without managers

SELECT 
    H.playerID,
    P.nameLast,
    P.nameFirst,
    H.yearid,
    H.inducted,
    H.category

FROM HallOfFame as H
INNER JOIN People as P
ON (H.playerID = P.playerID)
WHERE H.inducted = 'Y' and H.category = 'Player'

-- Pitching Table

SELECT 
    playerID,
    COUNT(1) as Seasons,
    sum(W) as Wins,
    sum(L) as Loses,
    sum(G) as Games,
    sum(GS) as Games_Started,
    sum(CG) as Complete_Games,
    sum(SHO) as Shut_Outs,
    sum(ER) as Earned_Runs,
    sum(SO) as Strike_Outs,
    sum(BB) as Walks,
    sum(GF) as Games_Finished,
    sum(R) as Runs_Allowed,
    sum(BFP) as Batters_Faced
FROM Pitching
GROUP BY playerID

-- Position of Players
-- Need to figure out how to add Unique Position to Player ID for search

SELECT
    playerID,
    sum(G_all) Total_Games,
    sum(GS) as Games_Started,
    sum(G_p) as Games_Pitched,
    sum(G_c) as Games_Catcher,
    sum(G_1b) as Games_First_Base,
    sum(G_2b) as Games_Second_Base,
    sum(G_3b) as Games_Third_Base,
    sum(G_ss) as Games_Short_Stop,
    sum(G_lf) as Games_Left_Field,
    sum(G_rf) as Games_Right_Field,
    sum(G_cf) as Games_Center_Field,
    sum(G_of) as Games_Out_Field,
    sum(G_dh) as Games_DH  
FROM Appearances
GROUP BY playerID

CREATE TABLE hall_of_fame (
	playerID VARCHAR(20) Primary Key,
	nameLast VARCHAR(30),
	nameFirst VARCHAR(20),
	yearid SMALLINT,
	inducted VARCHAR(5),
	category VARCHAR(20)
)

CREATE TABLE pitchers (
	playerID VARCHAR(20) Primary Key,
	nameFirst VARCHAR(20),
	nameLast VARCHAR(30),
	Seasons SMALLINT,
	Wins SMALLINT,
	Loses SMALLINT,
	Games SMALLINT,
	Games_Started SMALLINT,
	Complete_Games SMALLINT,
	Shut_Outs SMALLINT,
	Earned_Runs SMALLINT,
	Strike_Outs SMALLINT,
	Walks SMALLINT,
	Games_Finished SMALLINT,
	Runs_Allowed SMALLINT,
	Batters_Faced SMALLINT,
	weight SMALLINT,
	height SMALLINT,
	bats VARCHAR(5),
	throws VARCHAR(5),
	finalGame DATE,
	yearid SMALLINT,
	inducted VARCHAR(5)
)

CREATE TABLE player_demo (
	playerID VARCHAR(20) Primary Key,
	nameFirst VARCHAR(20),
	nameLast VARCHAR(30),
	weight SMALLINT,
	height SMALLINT,
	bats VARCHAR(5),
	throws VARCHAR(5),
	finalGame DATE,
)