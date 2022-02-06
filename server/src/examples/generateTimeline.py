import json
from json import tool
import random

from datetime import datetime, timedelta

finalCalendar = list()
tooltip = list()
def gen_datetime(min_year=1900, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    return (start + (end - start) * random.random()).strftime("%Y-%m-%d")
for i in range(1,100):
   finalCalendar.append({
       "date":f'{gen_datetime(2019,2019)} {random.randint(0,23)}:{random.randint(10,59)}',
       "commitMessage": f'fratele lui gicu da mare commit {random.randint(1,1000)}',
       "username": f'gicu {random.randint(1,1000)}'
   })
for i in range(1,100):
   finalCalendar.append({
       "date":f'{gen_datetime(2020,2020)} {random.randint(0,23)}:{random.randint(10,59)}',
        "commitMessage": f'fratele lui ion da mare commit {random.randint(1,1000)}',
       "username": f'ion {random.randint(1,1000)}'
   })
for i in range(1,100):
   finalCalendar.append({
       "date":f'{gen_datetime(2021,2021)} {random.randint(0,23)}:{random.randint(10,59)}',
        "commitMessage": f'fratele lui marin da mare commit {random.randint(1,1000)}',
       "username": f'marin {random.randint(1,1000)}'

   })
 
 
fh = open("generateTimeline.json", "a+")
fh.write(json.dumps({"illustrationData": {"Timeliner":{
     "commits":finalCalendar
    
    
}}})) # added an extra ')'.. code will now work
fh.close()