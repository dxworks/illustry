import json
import random

from datetime import datetime, timedelta

finalCalendar = list()
colors=["blue","green","red"]
ranges= list()
def gen_datetime(min_year=1900, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    return (start + (end - start) * random.random()).strftime("%Y-%m-%d")
for i in range(1,10):
   finalCalendar.append({"2019":{
       "date":f'{gen_datetime(2019,2019)}',
       "value":random.randint(1, 20),
   }
   })
for i in range(1,10):
   finalCalendar.append({"2019":{
       "date":f'{gen_datetime(2019,2019)}',
       "value":random.randint(21, 35),
   }
   })
for i in range(1,10):
   finalCalendar.append({"2019":{
       "date":f'{gen_datetime(2019,2019)}',
         "value":random.randint(35, 50),

   }
   })
for i in range(1,10):
   finalCalendar.append({"2020":{
       "date":f'{gen_datetime(2020,2020)}',
       "value":random.randint(1, 20),

   }
   })
for i in range(1,10):
   finalCalendar.append({"2020":{
       "date":f'{gen_datetime(2020,2020)}',
       "value":random.randint(21, 35),

   }
   })
for i in range(1,10):
   finalCalendar.append({"2020":{
       "date":f'{gen_datetime(2020,2020)}',
         "value":random.randint(35, 50),

   }
   })
for i in range(1,10):
   finalCalendar.append({"2021":{
       "date":f'{gen_datetime(2021,2021)}',
       "value":random.randint(1, 20),
   }
   })
for i in range(1,10):
   finalCalendar.append({"2021":{
       "date":f'{gen_datetime(2021,2021)}',
       "value":random.randint(21, 35),

   }
   })
for i in range(1,10):
   finalCalendar.append({"2021":{
       "date":f'{gen_datetime(2021,2021)}',
        "value":random.randint(35, 50),

   }
   })

fh = open("generateCalendar.json", "a+")
fh.write(json.dumps({"illustrationData": {"CalendarMatrix":{
    "calendar":finalCalendar,
    "ranges": [{"min":1, "max":15, "color":"red"},{"min":16, "max":30, "color":"green"},{"min":31, "max":50, "color":"blue"}]
    
}}})) # added an extra ')'.. code will now work
fh.close()