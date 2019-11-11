var tbody_position = d3.select("table#position tbody");
var thead_position = d3.select("table#position thead");
var tbody_pitcher = d3.select("table#pitcher tbody");
var thead_pitcher = d3.select("table#pitcher thead");
​
var button = d3.select("#reset_button");
​
function populate_player_table(position) {
  d3.select('#position tbody').selectAll('*').remove()
  d3.select('#position thead').selectAll('*').remove()
  var columnMap = [
    {
      jsonColName: 'nameFirst',
      prettyColLabel: 'First'
    },
    {
      jsonColName: 'nameLast',
      prettyColLabel: 'Last'
    },
    {
      jsonColName: 'Seasons',
      prettyColLabel: 'Seasons'
    },
    {
      jsonColName: 'primary_position',
      prettyColLabel: 'Position'
    },
    {
      jsonColName: 'bats',
      prettyColLabel: 'Bats'
    },
    {
      jsonColName: 'throws',
      prettyColLabel: 'Throws'
    },
    {
      jsonColName: 'yearid',
      prettyColLabel: 'Yr Inducted'
    },
    {
      jsonColName: 'Hits',
      prettyColLabel: 'Hits'
    },
    {
      jsonColName: 'Home_Runs',
      prettyColLabel: 'HRs'
    },
    {
      jsonColName: 'RBIs',
      prettyColLabel: 'RBIs'
    },
    {
      jsonColName: 'Runs',
      prettyColLabel: 'Runs'
    },
    {
      jsonColName: 'Doubles',
      prettyColLabel: '2B'
    },
    {
      jsonColName: 'Triples',
      prettyColLabel: '3B'
    },
  ]
  if (!position) {
    position = ''
  }
  if (position != '') {
    d3.select('#pitcher tbody').selectAll('*').remove()
    d3.select('#pitcher thead').selectAll('*').remove()
    columnMap.splice(7, 0, {
      jsonColName: 'model_predict',
      prettyColLabel: 'Predicted'
    })
  }
  d3.json('/position_players/' + position)
    .then(function (data) {
      var data_position = data
      var header_row = thead_position.append("tr");
      columnMap.forEach((columnMapItem) => {
        var cell = header_row.append("th");
        cell.text(columnMapItem.prettyColLabel);
      });
      var num_hall = 0;
      data_position.forEach((player) => {
        if (player.yearid != null) { num_hall++; }
        console.log(num_hall)
        var row = tbody_position.append("tr");
        columnMap.forEach((columnMapItem) => {
          var value = player[columnMapItem.jsonColName];
          var cell = row.append("td");
          cell.text(value);
        });
      });
      var count_actually_in_hall = data_position.filter(player => player.yearid != null).length;
      var count_predicted_in_hall = data_position.filter(player => player.model_predict === 'Y').length;
      var count_actually_in_hall_and_predicted_in_hall = data_position.filter(player => player.model_predict === 'Y' && player.yearid != null).length;
​
      if (position) {
        position_select_metrics(position.replace(/_/g, " "), num_hall, data_position.length)
      };
    });
}
​
​
function populate_pitcher_table() {
  d3.select('#pitcher tbody').selectAll('*').remove()
  d3.select('#pitcher thead').selectAll('*').remove()
​
  d3.json('/pitchers')
    .then(function (data) {
      console.log(data)
      var data_pitchers = data
      var columnMap = [
        {
          jsonColName: 'nameFirst',
          prettyColLabel: 'First'
        },
        {
          jsonColName: 'nameLast',
          prettyColLabel: 'Last'
        },
        {
          jsonColName: 'Seasons',
          prettyColLabel: 'Seasons'
        },
        {
          jsonColName: 'throws',
          prettyColLabel: 'Throws'
        },
        {
          jsonColName: 'Wins',
          prettyColLabel: 'Wins'
        },
        {
          jsonColName: 'Loses',
          prettyColLabel: 'Loses'
        },
        {
          jsonColName: 'yearid',
          prettyColLabel: 'Yr Inducted'
        },
        {
          jsonColName: 'model_predict',
          prettyColLabel: 'Predicted'
        },
        {
          jsonColName: 'Complete_Games',
          prettyColLabel: 'CG'
        },
        {
          jsonColName: 'Shut_Outs',
          prettyColLabel: 'SHO'
        },
        {
          jsonColName: 'Strike_Outs',
          prettyColLabel: 'SO'
        },
        {
          jsonColName: 'Walks',
          prettyColLabel: 'BB'
        },
        {
          jsonColName: 'Runs_Allowed',
          prettyColLabel: 'Runs Allowed'
        },
        {
          jsonColName: 'Earned_Runs',
          prettyColLabel: 'ER'
        },
        {
          jsonColName: 'Batters_Faced',
          prettyColLabel: 'Batters Faced'
        }
      ]
      var header_row = thead_pitcher.append("tr");
      columnMap.forEach((columnMapItem) => {
        var cell = header_row.append("th");
        cell.text(columnMapItem.prettyColLabel);
      });
      var num_hall = 0;
      data_pitchers.forEach((player) => {
        if (player.yearid != null) { num_hall++ }
        var row = tbody_pitcher.append("tr");
        columnMap.forEach((columnMapItem) => {
          var value = player[columnMapItem.jsonColName];
          var cell = row.append("td");
          cell.text(value);
        });
      });
​
      // This is what Nate was thinking, but notice how it loops the data_pitchers list *3 extra times* 
      var count_actually_in_hall = data_pitchers.filter(player => player.yearid != null).length;
      var count_predicted_in_hall = data_pitchers.filter(player => player.model_predict === 'Y').length;
      // this variable is redundant I guess, its value always equal to count_actually_in_hall_and_predicted_in_hall, because all players are predicted="Y"?
      var count_actually_in_hall_and_predicted_in_hall = data_pitchers.filter(player => player.model_predict === 'Y' && player.yearid != null).length;
​
      position_select_metrics('Pitchers', num_hall, data_pitchers.length)
    });
};
​
function populate_pitcher_hall_table() {
  d3.select('#pitcher tbody').selectAll('*').remove()
  d3.select('#pitcher thead').selectAll('*').remove()
​
  d3.json('/pitchers_hall')
    .then(function (data) {
      var data_pitchers = data
      var columnMap = [
        {
          jsonColName: 'nameFirst',
          prettyColLabel: 'First'
        },
        {
          jsonColName: 'nameLast',
          prettyColLabel: 'Last'
        },
        {
          jsonColName: 'Seasons',
          prettyColLabel: 'Seasons'
        },
        {
          jsonColName: 'throws',
          prettyColLabel: 'Throws'
        },
        {
          jsonColName: 'Wins',
          prettyColLabel: 'Wins'
        },
        {
          jsonColName: 'Loses',
          prettyColLabel: 'Loses'
        },
        {
          jsonColName: 'yearid',
          prettyColLabel: 'Yr Inducted'
        },
        {
          jsonColName: 'Complete_Games',
          prettyColLabel: 'CG'
        },
        {
          jsonColName: 'Shut_Outs',
          prettyColLabel: 'SHO'
        },
        {
          jsonColName: 'Strike_Outs',
          prettyColLabel: 'SO'
        },
        {
          jsonColName: 'Walks',
          prettyColLabel: 'BB'
        },
        {
          jsonColName: 'Runs_Allowed',
          prettyColLabel: 'Runs Allowed'
        },
        {
          jsonColName: 'Earned_Runs',
          prettyColLabel: 'ER'
        },
        {
          jsonColName: 'Batters_Faced',
          prettyColLabel: 'Batters Faced'
        }
      ]
      var header_row = thead_pitcher.append("tr");
      columnMap.forEach((columnMapItem) => {
        var cell = header_row.append("th");
        cell.text(columnMapItem.prettyColLabel);
      });
      data_pitchers.forEach((player) => {
        console.log(player)
        var row = tbody_pitcher.append("tr");
        columnMap.forEach((columnMapItem) => {
          var value = player[columnMapItem.jsonColName];
          var cell = row.append("td");
          cell.text(value);
        });
      });
    });
};
​
function position_select_metrics(position, hall_number, predict_number) {
  d3.select('#metrics-position h5.card-title')
    .text(`You Have Chosen the position: ${position}`)
  d3.select('#metrics-position p.card-text')
    .text(`${hall_number} have been selected to the Hall by BWAA. The machine learning model predicted ${predict_number}.`)
  d3.select('#metrics-position card-body')
    .append('p')
    .text(`Test`)
​
}
​
// When page loads for the first time or is reloaded run these functions by default
populate_player_table()
populate_pitcher_hall_table()
​
// Reset Page Button
button.on("click", function () {
  window.location.reload()
});
​
// Dropdown menu selection of a position
console.log(d3.selectAll('.dropdown-item').size())
d3.selectAll('.dropdown-item').on("click", function () {
  d3.event.preventDefault(); //prevent the default behavior anchor links; prevent page-reloading
  console.log(this.innerText)
  var value = this.innerText;
  if (value == "Pitchers") {
    // .remove() is redundant; the populate_ functions will handle this, right?
    // d3.select('#position tbody').selectAll('*').remove()
    // d3.select('#position thead').selectAll('*').remove()
    // d3.select('#position_table').selectAll('*').remove()
    // d3.select('#default-metrics-pitcher').selectAll('*').remove()
    
    d3.select('#position').style('display', 'none');
    d3.select('#metrics-position').style('display', 'none');
​
    d3.select('#pitcher').style('display', 'block');
    d3.select('#default-metrics-pitcher').style('display', 'block');
​
    populate_pitcher_table();
  } else {
    // .remove() is redundant; the populate_ functions will handle this, right?
    // d3.select('#pitcher tbody').selectAll('*').remove()
    // d3.select('#pitcher thead').selectAll('*').remove()
    // d3.select('#default-metrics-pitcher').selectAll('*').remove()
    
    d3.select('#position').style('display', 'block');
    d3.select('#metrics-position').style('display', 'block');
    
    d3.select('#pitcher').style('display', 'none');
    d3.select('#default-metrics-pitcher').style('display', 'none');
​
​
    if (value == "All Position Players") {
      populate_player_table('All_Position_Players')
    } else if (value == "Outfield") {
      populate_player_table('Out_Field')
    } else {
      value = value.replace(" ", "_")
      populate_player_table(value)
    }
  }
});