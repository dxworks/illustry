#!/bin/bash
# SYSTEM
npm run generate:json-schema "./src/types/*.ts" "Node" -- --out "./jsonSchemas/Node.json" --required  
npm run generate:json-schema "./src/types/*.ts" "Link" -- --out "./jsonSchemas/Link.json" --required  
npm run generate:json-schema "./src/types/*.ts" "NodeLink" -- -- out "./jsonSchemas/NodeLink.json" --required 
npm run generate:json-schema "./src/types/*.ts" "CalendarData" -- --out "./jsonSchemas/CalendarData.json" --required  
npm run generate:json-schema "./src/types/*.ts" "TimelineEventTag" -- --out "./jsonSchemas/TimelineEventTag.json" --required  
npm run generate:json-schema "./src/types/*.ts" "TimelineEvent" -- --out "./jsonSchemas/TimelineEvent.json" --required  
npm run generate:json-schema "./src/types/*.ts" "Timeline" -- --out "./jsonSchemas/Timeline.json" --required  
npm run generate:json-schema "./src/types/*.ts" "CalendarHeatmap" -- --out "./jsonSchemas/CalendarHeatmap.json" --required  
npm run generate:json-schema "./src/types/*.ts" "Sankey" -- --out "./jsonSchemas/Sankey.json" --required  

