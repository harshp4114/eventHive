const mongoose=require('mongoose');

const chatSchema = new mongoose.Schema({
    event_host_id: {
      type: mongoose.Schema.Types.ObjectId,  
      required: true,
      ref: 'EventHost'                      
    },
    sponsor_id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'Sponsor'                        
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ['event_host', 'sponsor'],  
          required: true
        },
        text: {
          type: String,
          required: true                    
        },
        timestamp: {
          type: Date,
          default: Date.now                 
        },
        read: {
          type: Boolean,
          default: false                    
        }
      }
    ],
    unread_messages: {
      type: Number,
      default: 0                            
    },
    last_message_timestamp: {
      type: Date,
      default: Date.now                     
    }
  },{ versionKey: false });
  
  const chat = mongoose.model('chats',chatSchema);

module.exports=chat;
  