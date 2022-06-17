#!/bin/bash
# SYSTEM
npm run generate:json-schema "./src/index.d.ts" "Node" -- --out "./jsonSchemas/Node.json" --required  
npm run generate:json-schema "./src/index.d.ts" "Link" -- --out "./jsonSchemas/Link.json" --required  
npm run generate:json-schema "./src/index.d.ts" "NodeLink" -- -- out "./jsonSchemas/NodeLink.json" --required 
npm run generate:json-schema "./src/index.d.ts" "CalendarData" -- --out "./jsonSchemas/CalendarData.json" --required  
npm run generate:json-schema "./src/index.d.ts" "TimelineEventTag" -- --out "./jsonSchemas/TimelineEventTag.json" --required  
npm run generate:json-schema "./src/index.d.ts" "TimelineEvent" -- --out "./jsonSchemas/TimelineEvent.json" --required  
npm run generate:json-schema "./src/index.d.ts" "Timeline" -- --out "./jsonSchemas/Timeline.json" --required  
npm run generate:json-schema "./src/index.d.ts" "CalendarHeatmap" -- --out "./jsonSchemas/CalendarHeatmap.json" --required  
npm run generate:json-schema "./src/index.d.ts" "Sankey" -- --out "./jsonSchemas/Sankey.json" --required  

