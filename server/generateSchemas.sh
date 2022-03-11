#!/bin/bash
# SYSTEM
npm run generate:json-schema "./src/types/*.ts" "Node" -- --out "./jsonSchemas/Node.json" --required  
npm run generate:json-schema "./src/types/*.ts" "NodesMatrix" -- --out "./jsonSchemas/NodesMatrix.json" --required  
npm run generate:json-schema "./src/types/*.ts" "Link" -- --out "./jsonSchemas/Link.json" --required  
npm run generate:json-schema "./src/types/*.ts" "LinksMatrix" -- --out "./jsonSchemas/LinksMatrix.json" --required  

 


npm run generate:json-schema "./src/types/*.ts" "LinksSankey" -- --out "./jsonSchemas/LinksSankey.json" --required  
npm run generate:json-schema "./src/types/*.ts" "NodesSankey" -- --out "./jsonSchemas/NodesSankey.json" --required  
npm run generate:json-schema "./src/types/*.ts" "CalendarData" -- --out "./jsonSchemas/CalendarData.json" --required  
npm run generate:json-schema "./src/types/*.ts" "TimelineEventTag" -- --out "./jsonSchemas/TimelineEventTag.json" --required  

 

npm run generate:json-schema "./src/types/*.ts" "TimelineEvent" -- --out "./jsonSchemas/TimelineEvent.json" --required  
npm run generate:json-schema "./src/types/*.ts" "Timeline" -- --out "./jsonSchemas/Timeline.json" --required  
npm run generate:json-schema "./src/types/*.ts" "CalendarHeatmap" -- --out "./jsonSchemas/CalendarHeatmap.json" --required  
npm run generate:json-schema "./src/types/*.ts" "Matrix" -- --out "./jsonSchemas/Matrix.json" --required  

 
npm run generate:json-schema "./src/types/*.ts" "DOT" -- --out "./jsonSchemas/DOT.json" --required  
npm run generate:json-schema "./src/types/*.ts" "FLG" -- --out "./jsonSchemas/FLG.json" --required  
npm run generate:json-schema "./src/types/*.ts" "HEB" -- --out "./jsonSchemas/HEB.json" --required  
npm run generate:json-schema "./src/types/*.ts" "Sankey" -- --out "./jsonSchemas/Sankey.json" --required  

