import json
from json import tool
import random

from datetime import datetime, timedelta

finalCalendar = list()
colors=["blue","green","red"]
categories = ["cat1","cat2","cat3"]
tooltip = list()
def gen_datetime(min_year=1900, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    return (start + (end - start) * random.random()).strftime("%Y-%m-%d")
for i in range(1,30):
   finalCalendar.append({
       "date":f'{gen_datetime(2019,2019)}',
       "value":random.randint(1, 20),
       "year":2019,
       "category":random.choice(categories)
   })
for i in range(1,30):
   finalCalendar.append({
       "date":f'{gen_datetime(2020,2020)}',
       "value":random.randint(21, 35),
       "year":2020,
       "category":random.choice(categories)
   })
for i in range(1,30):
   finalCalendar.append({
       "date":f'{gen_datetime(2021,2021)}',
       "value":random.randint(35, 50),
       "year":2021,
       "category":random.choice(categories)

   })
 
 
fh = open("generateCalendar1.json", "a+")
fh.write(json.dumps({"illustrationData": {"CalendarMatrix":{
    "calendar":finalCalendar,
    "categories":{
                "cat1": "red",
                "cat2": "green",
                "cat3": "yellow"
            }
    
    
}}})) # added an extra ')'.. code will now work
fh.close()