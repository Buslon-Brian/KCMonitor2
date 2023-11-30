import {proxy} from  'valtio'

export const store = proxy({
    username: "TestUser",
    cur_assign: 'N/A',
    cur_floor: 5,
    floor_count: [0, 0 ,0 ,0 ,0, 0],
    prop_codes: ["PR:4 Rotunda", "PR:4 S Restroom", "PR:4 S Stacks", "PR:4 Tower", "PR:5 E Stacks", "PR:5 N Restroom", "PR:5 N W Corner",
    "PR:5 Roof Access", "PR:5 S Restroom", "PR:5 S Stacks", "PR:5 Tower", "PR:Loading Docks", "PR:Popular Reading", "PR:Reference Area",
    "PR:1 Back Stairs", "PR:1 Garden", "PR:1 Main Gate", "PR:1 N Restroom", "PR:1 Stairs B", "PR:1 Viewing Room", "PR:2 Back Stairs",
    "PR:2 N Entrance", "PR:2 N Restroom", "PR:2 S Restroom", "PR:2 Stairs F", "PR:3 Back Stairs", "PR:3 Basque Back", "PR:3 Basque Lobby",
    "PR:3 N Overlook", "PR:3 N Restroom", "PR:3 S Restroom", "PR:3 S Stacks", "PR:3 Tower", "PR:4 Back Stairs", "PR:4 Carrels", 
    "PR:4 E Stacks", "PR:4 N Restroom", "PR:4 N Stacks" ],
    prnt_codes:["Print:2 North 1", "Print:2 North 2", "Print:2 South 1", "Print:2 South 2", "Print:3 North West", "Print:3 South East",
    "Print:3 South West", "Print:4 North East", "Print:4 North West", "Print:4 South East", "Print:4 South West", "Print:5 North",
    "Print:5 South"],
    
    prop_scanned:[],
    prnt_scanned:[]

    
    
})