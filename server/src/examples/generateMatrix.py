import json
import random
nodes=[]
links=[]
colors=["blue","green","red"]
for i in range(1,200):
    nodes.append(
        {"name":f'nameG1${i}', "group":1,"properties":[{
        "label":"Size(%)", "value": random.randint(1, 50),   "style": {
          "font-weight": "bold",
          "color": "green"
        }
      },
      {
        "label": "Devs",
        "value": random.randint(1, 50),
        "style": {
          "font-weight": "bold"
        }
      },
      {
        "label": "Active Devs",
        "value": random.randint(1, 50),
        "style": {
          "font-weight": "bold"
        }
      },
      {
        "label": "APKS(%)",
        "value": random.randint(1, 50),
        "style": {
          "font-weight": "bold"
        }
      }
    ],
    "style": {
      "font-weight": "bold",
      "color": "green"
    }
  })

for i in range(1,30):
    nodes.append( {
    "name": f'nameG2${i}',
    "group": 2,
    "properties": [
      {
        "label": "Knowledge(%)",
        "value": random.randint(1, 50),
        "tooltip":{
            "val1": random.randint(1,20),
            "val2": random.randint(1,20),
            "val3": random.randint(1,20),
            "val4": random.randint(1,20),
            "val5": "Aberation Matrix"
        },
        "style": {
          "font-weight": "bold",
          "color": "black",
          "background-color": "green"
        }
      },
      {
        "label": "Components",
        "value": random.randint(1, 50),
         "tooltip":{
            "val1": random.randint(1,20),
            "val2": random.randint(1,20),
            "val3": random.randint(1,20),
            "val4": random.randint(1,20),
            "val5": "Aberation Matrix"
        },
        "style": {
          "font-weight": "bold"
        }
      }
    ],
    "style": {
      "font-weight": "bold",
      "color": "black",
      "background-color": "green"
    }
  })
for i in range(1,200):
    for j in range(1,30):
        links.append({
            "source":f'nameG1${i}',
            "target":f'nameG2${j}',
            "value": random.randint(1, 50),
            "tooltip":{
            "val1": random.randint(1,20),
            "val2": random.randint(1,20),
            "val3": random.randint(1,20),
            "val4": random.randint(1,20),
            "val5": "Aberation Matrix"
        },
            "style": {
            "background-color": random.choice(colors)
            }
        })

fh = open("generatedMatrix1.json", "a+")
fh.write(json.dumps({"illustrationData": {"Matrix":{
    "nodes":nodes,
    "links":links
}}})) # added an extra ')'.. code will now work
fh.close()