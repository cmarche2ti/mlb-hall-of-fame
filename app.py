import numpy as np
import pandas as pd
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('mlb-hall.html')

@app.route("/methodology")
def methodology():
    return render_template('mlb-hof-methodology.html')

@app.route("/position_players")
@app.route("/position_players/")
@app.route("/position_players/<position>")
def position_players(position=None):
    position_players = pd.read_csv('Data/position_players_predicted.csv')
    # print(position)
    # print(position_players['primary_position'].value_counts())
    if position == 'All_Position_Players':
        position_players = position_players.loc[position_players['model_predict']=='Y']
    elif position:
        position_players = position_players.loc[(position_players['primary_position']==position) & (position_players['model_predict']=='Y')]
    else:
        position_players = position_players.loc[position_players['inducted']=='Y']
    player_json = position_players.to_json(orient='records')
    return player_json

@app.route("/pitchers")
@app.route("/pitchers/")
def pitchers():
    pitchers = pd.read_csv("Data/pitchers_predicted.csv")
    pitchers = pitchers.loc[pitchers['model_predict']=='Y']
    pitcher_json = pitchers.to_json(orient='records')
    return pitcher_json

@app.route("/pitchers_hall")
@app.route("/pitchers_hall/")
def pitchers_hall():
    pitchers_hall = pd.read_csv("Data/pitchers_predicted.csv")
    pitchers_hall = pitchers_hall.loc[pitchers_hall['inducted']=='Y']
    pitchers_hall_json = pitchers_hall.to_json(orient='records')
    return pitchers_hall_json

@app.route("/metrics/")
@app.route("/metrics")
def metrics():
    hall_metrics = {}
    pitchers = pd.read_csv("Data/pitchers_predicted.csv")
    position_player = pd.read_csv('Data/position_players_predicted.csv')
    eligible_dict = position_player[position_player['eligible_for_hall']=='eligible'].primary_position.value_counts().to_dict()
    eligible_dict['Pitchers'] = len(pitchers[pitchers['eligible_for_hall']=='eligible'])
    current_hall_dict = position_player[position_player['inducted']=='Y'].primary_position.value_counts().to_dict() 
    current_hall_dict['Pitchers'] = len(pitchers[pitchers['inducted']=='Y'])
    hall_metrics['eligible_for_hall'] = eligible_dict
    hall_metrics['currently_in_hall'] = current_hall_dict
    ml_predicted_dict = position_player[position_player['model_predict']=='Y'].primary_position.value_counts().to_dict()
    ml_predicted_dict['Pitchers'] = len(pitchers[pitchers['model_predict']=='Y'])
    hall_metrics['model_predicted'] = ml_predicted_dict
    both_predicted_and_inducted = position_player[(position_player['model_predict']=="Y") & (position_player['inducted']=='Y')].primary_position.value_counts().to_dict()
    both_predicted_and_inducted['Pitchers'] = len(pitchers[(pitchers['model_predict']=="Y")&(pitchers['inducted']=="Y")])
    hall_metrics['both_predicted_and_inducted'] = both_predicted_and_inducted
    return jsonify(hall_metrics)


if __name__ == '__main__':
    app.run(debug=True)