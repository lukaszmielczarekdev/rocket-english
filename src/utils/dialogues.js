const dialogues = {
  crion: [
    {
      id: 1,
      unlocks: 0,
      place: "shop",
      question: "Why aren't you buying goods from customers?",
      answer:
        "Once I bought aluminum at a very cheap price, then Galactic Police officers came to me and confiscated all the goods that were supposedly stolen. They said it's been a common situation lately and they are on the trail of a gang that is distributing stolen goods around the galaxy. So far, I have not recovered neither the credits nor the goods, so just in case I have suspended the buying.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 2,
      unlocks: 0,
      place: "shop",
      question:
        "Do you know anything about a space rocket that recently landed here?",
      answer:
        "Many rockets land here, our planet is a popular tourist attraction. But yes... I heard that recently mercenaries returning from an expedition put a rocket on the landing field, which they intercepted drifting near the planet. They tried to open it afterwards, but it was tightly closed. Apparently, no one has left it since landing. That's all I know, you can ask the mercenaries about the rest, they said something about the fact that they didn't find anything but this rocket during the expedition and they have to go back to Therion, so you will probably find them there.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 3,
      unlocks: 0,
      place: "casino",
      question:
        "When someone wins a big win in your casino can count on any privileges?",
      answer:
        "Of course! If you hit a big win, you will become a VIP and you will gain respect from everyone! We'll give you a free room with an overnight stay and whatever you want, we can't let you leave our casino with so much money, it's dangerous! Instead, we will offer you a free stay for as long as you want. All this so that you can continue betting in our casino and of course increase your winnings. Happiness has to be helped, if you won once you will surely win again!",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 4,
      unlocks: 0,
      place: "factory",
      question: "Where do you get the materials from?",
      answer:
        "We take spare parts from ships that are no longer repairable or unprofitable to repair. If we have the right parts, we build the necessary elements ourselves. Rare parts are provided by mercenaries who hunt UFOs - these ships are a real treasure. I am waiting for the day when we manage to take over some large ship and we can obtain some alien technology. They supposedly know how to teleport... think how much it would make our lives easier.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 5,
      unlocks: 0,
      place: "factory",
      question: "Any recent rumors?",
      answer:
        "Recently, a mercenary boasted that he had encountered a spaceship filled with supplies in Axios' orbit. There was no sign of the crew on the spot, no signs of a fight, and it is not known what happened and why the crew left the ship, leaving everything intact. The mercenary complained that none of the wealthy businessmen on Axios wanted to finance him an expedition to bring the ship to the planet and share the find. Soon after, the mercenary disappeared somewhere. That's all I know.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 6,
      unlocks: 0,
      place: "university",
      question: "Tell me about the past simple form of 'to be'.",
      answer:
        "We use was/were as the past simple forms of be. Was is used for I/he/she/it and were for you/we/they. The negative forms are was not (wasn’t) and were not (weren’t). Was/were are the past forms of am/is/are. Examples: I was in my rocket yesterday. We were happy after shopping. Sharik wasn't hungry. We were curious of that new planet. I'm good. => I was good. She is in my rocket. => She was in my rocket yesterday.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 7,
      unlocks: 0,
      place: "university",
      question:
        "My expedition encountered a strange vortex which caused electromagnetic discharges disrupting the rocket. Can you tell me about this strange phenomenon?",
      answer:
        "I have heard of something like this, no one knows how they arise, but as far as I know, there are at least a dozen such vortexes in our galaxy. There is a special department at Axios University that deals with the study of such phenomena. You will probably learn more there.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 8,
      unlocks: 0,
      place: "shop",
      question: "Why is there a casino on a planet inhabited by children?",
      answer:
        "You do not know? A wealthy businessman from Axios has built a chain of casinos across the galaxy. If you don't want to get into trouble, you better not go there. A friend of mine played there once and unfortunately won, the casino manager immediately appeared in his shiny suit and invited him for a drink. They brainwashed him so much that he stayed there overnight and lost everything the next day. He returned to them asking for a refund as he noticed that the dealer had set up the game and instead of dealing with the case they had sent some thugs on him. I'm telling you, stay away from them.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
  ],
  therion: [
    {
      id: 1,
      unlocks: 2,
      place: "bar",
      question:
        "Where can I find a mercenary group that recently delivered a drifting rocket to Crion? Surely you've heard of it, such news usually travels quickly.",
      answer:
        "They are sitting at a table to the right of the entrance. These are the ones who play poker. They have recently returned from an expedition, they are now free, if you want, you can hire them and send your own expedition, maybe you'll be lucky.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 2,
      unlocks: 0,
      place: "bar",
      question: "Ask the mercenaries about the rocket.",
      answer:
        "That's right, we brought this rocket to the planet. Such drifting objects are dangerous to other ships, and we thought we would find someone inside, but we couldn't open it. We decided that it was empty and someone would come to pick it up. There is something else... in the distance we saw a small ship moving away from the rocket very quickly, which did not look as if it was drifting. We were too far to catch up with him so we didn't even try. He was flying madly towards Crystalia.",
      completed: false,
      shownOnce: false,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 3,
      unlocks: 0,
      place: "university",
      question: "Tell me about the past simple form of 'to be'.",
      answer:
        "We use was/were as the past simple forms of be. Was is used for I/he/she/it and were for you/we/they. The negative forms are was not (wasn’t) and were not (weren’t). Was/were are the past forms of am/is/are. Examples: I was in my rocket yesterday. We were happy after shopping. Sharik wasn't hungry. We were curious of that new planet. I'm good. => I was good. She is in my rocket. => She was in my rocket yesterday.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 4,
      unlocks: 0,
      place: "shop",
      question: "Has anything unusual happened in the area recently?",
      answer:
        "On Crion, a moonshine merchant was caught trying to sell his goods in one of the local stores. I was also incedent, some time ago a strange guy came to me, for a moment I thought he was a Galactic Police officer in disguise, but something told me that he was a real smuggler. When I refused him, he looked at me so that I had the impression that he would be back again. So far he has not appeared...",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 5,
      unlocks: 0,
      place: "shop",
      question: "Can you negotiate the prices of goods with you?",
      answer:
        "I used to like to negotiate when I was younger, now I have no patience for it. Customers can propose absurd prices for very valuable goods and then waste my time justifying why I should agree.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 6,
      unlocks: 0,
      place: "mine",
      question: "Do accidents at work happen frequently?",
      answer:
        "Accidents used to be common in the past, but since the Galactic Labor Inspectorate took control of the mines and introduced health and safety regulations, accidents hardly ever happen.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 7,
      unlocks: 0,
      place: "mine",
      question: "Can you make a living from working in the mine?",
      answer:
        "The miners earn good money, they never went on strike. Since the working conditions have improved, they are very satisfied, and if they dig up a rare mineral, they take it away.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
  ],
  crystalia: [
    {
      id: 1,
      unlocks: 2,
      place: "bar",
      question:
        "[ANNA] Hi Anna, how good I found you. I woke up alone with Sharik in our rocket, I don't remember anything",
      answer:
        "Anna: Hi, we're finally seeing each other, I was worried. Where's Johnny? I thought he was with you. Since landing, I ask everyone if they have heard anything about the UFO pursuit of a rocket, but no one knows anything.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 2,
      unlocks: 3,
      place: "bar",
      question:
        "[ANNA] What exactly happened? How did we get into this strange galaxy?",
      answer:
        "Anna: It was this vortex that we investigated that caused control and connectivity problems, then it dragged us in and spit out on the other side. Then we saw a large UFO-like ship destroy a smaller one by firing a laser at it. Moments after that, the UFO ship turned towards us, so we decided to flee. Fortunately, the vortex did not attract us anymore and we managed to fly away. We noticed that the enemy ship was catching up with us, so we agreed that we split up in case they started shooting at us just like the other ship. It fell on me, so I got in the capsule and I left the rocket, and you, Johnny and Sharik flew on, escaping the UFO.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 3,
      unlocks: 0,
      place: "bar",
      question:
        "[ANNA] We have to find Johnny, let's ask around, maybe someone knows something.",
      answer:
        "Anna: The bartender mentioned earlier that one of the mercenaries, who had just returned from Thalia, was angry that his job was lost because some tourist in a casino on Thalia was allegedly asking about the possibility of organizing a trip to look for a rocket. Unfortunately, he found out about it after the fact, and the tourist disappeared somewhere. Nobody at the casino told the man that he could find people to work in here at Crystalia in the bar. Before that, I did not associate this fact with our rocket, maybe it is a clue...",
      completed: false,
      shownOnce: false,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 4,
      unlocks: 0,
      place: "bar",
      question: "How are the expeditions organized?",
      answer:
        "First, you need to talk to and hire mercenaries, they differ depending on the skill, usually the strongest cost the most. Then you send them on a trip and wait for them to come back. You cannot hire them on every planet, it is assumed that mercenaries usually focus on the planets Therion, Crystalia and Bathea.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 5,
      unlocks: 0,
      place: "university",
      question: "Tell me about the past simple form of 'to be'.",
      answer:
        "We use was/were as the past simple forms of be. Was is used for I/he/she/it and were for you/we/they. The negative forms are was not (wasn’t) and were not (weren’t). Was/were are the past forms of am/is/are. Examples: I was in my rocket yesterday. We were happy after shopping. Sharik wasn't hungry. We were curious of that new planet. I'm good. => I was good. She is in my rocket. => She was in my rocket yesterday.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 6,
      unlocks: 0,
      place: "factory",
      question: "Are you looking for someone to work?",
      answer:
        "Now we have a full set of people, more and more employees are replaced by robots, which they do not quite like. Well... such times.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
  ],
  thalia: [
    {
      id: 1,
      unlocks: 0,
      place: "shop",
      question: "Where do you get the goods from?",
      answer:
        "Until recently, we bought them from customers, but recently we only source from trusted wholesalers. Some time ago, a client was offering large amounts of moonshine, he looked suspicious and looked at me strangely when I told him that moonshine is forbidden on our planet. Same with the rest of the plenets. Weird guy.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 2,
      unlocks: 3,
      place: "casino",
      question:
        "Apparently some tourist asked about the crew on a rocket search expedition. Where is he?",
      answer:
        "Yes, I remember something. Some guy was looking for mercenaries for the expedition, I tried to tell him to go to Crystalia, but a stranger quickly approached him and offered to help in this matter. From what I could see, the stranger lent him some money so that he would buy supplies for the expedition and hire some special mercenary, from whom he would also buy the supplies. After returning from the expedition, he was to pay off the debt.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 3,
      unlocks: 0,
      place: "casino",
      question: "Where is that guy now?",
      answer:
        "He's gone, I don't know anything else. I don't want anything to do with it anyway, there are a lot of dodgy guys around, I don't want it to get out that I'm talking to strangers about them. Ask elsewhere.",
      completed: false,
      shownOnce: false,
      hidden: true,
      specialAction: false,
      plot: false,
    },
    {
      id: 4,
      unlocks: 0,
      place: "casino",
      question: "Do the players win often?",
      answer:
        "Of course! We have the highest number of wins in the galaxy! I encourage you to play, roulette, poker, maybe you can play the machine? Whoever plays the game wins!",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 5,
      unlocks: 0,
      place: "shop",
      question:
        "We're looking for a certain guy who was getting ready for an expedition and was supposed to be here for supplies. Have you seen him?",
      answer:
        "Unfortunately, no one like this has been here recently. I do not complain about the excess of customers, I would remember if someone like this would come here.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 6,
      unlocks: 0,
      place: "shop",
      question: "Do you know any of the latest rumors?",
      answer:
        "Strange tunnels leading inland have been found on the planet. It is not known what is at the bottom, they have fenced the area and do not let anyone in.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 7,
      unlocks: 0,
      place: "mine",
      question: "What are you getting out here?",
      answer:
        "Mainly crystals, sometimes we come across some other valuable minerals that can be used to earn extra money. You won't find crystals in the stores, they are too valuable for anyone to keep in the back of the store. Look for them on expeditions, it's not easy, but as far as I know, it's the only way to get them.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 8,
      unlocks: 0,
      place: "mine",
      question: "Has anything interesting happened in the area recently?",
      answer:
        "Oh yes, there was such an incident. The galactic police detained a guy claiming to be a tourist who turned out to be a moonshine smuggler. At the time of arrest, he shouted something about being robbed and framed by an accomplice, but you know... every convict claims he is innocent. They transported him to the prison on Bathea, where he is awaiting a smuggling trial. If he fails to defend himself, he will be in a long sentence.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 9,
      unlocks: 0,
      place: "university",
      question: "Tell me about the past simple form of 'to be'.",
      answer:
        "We use was/were as the past simple forms of be. Was is used for I/he/she/it and were for you/we/they. The negative forms are was not (wasn’t) and were not (weren’t). Was/were are the past forms of am/is/are. Examples: I was in my rocket yesterday. We were happy after shopping. Sharik wasn't hungry. We were curious of that new planet. I'm good. => I was good. She is in my rocket. => She was in my rocket yesterday.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
  ],
  xillon: [
    {
      id: 1,
      unlocks: 0,
      place: "mine",
      question: "The whole planet looks like this?",
      answer:
        "Yes. The war has been going on for a very long time and I have the impression that the younger generations have already forgotten how it all began, the propaganda has done its job.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 2,
      unlocks: 3,
      place: "mine",
      question:
        "General Nelson sent us here on a mission to help reclaim the city. Tell me what is the plan.",
      answer:
        "The assault is about to begin just in time, we are short of people to handle laser rifles and cannons. There is a laser cannon on the tower, or what's left of it, go there and wait for the order. If I give a sign, shoot the androids first, and then the mechanical rovers - you will see them from a distance, they are huge and shoot with lasers.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 3,
      unlocks: 9,
      place: "shop",
      question:
        "[SOLDIER] I came here to operate the cannon, they sent me here from the mine post.",
      answer:
        "Soldier: Just in time, the enemy is on the way. When I let you know, start shooting, I'll be your navigator. Let me know when you're ready.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: {
        title: "Fight!",
        action: "fight",
        requirement: 0,
        error: "",
        completed: false,
      },
      plot: true,
    },
    {
      id: 4,
      unlocks: 0,
      place: "shop",
      question:
        "Where do you get the goods from, your suppliers are not afraid to come here? Do you have any clients in a place like this?",
      answer:
        "There is no shortage of scrap metal here, I transform it into other things. Shipments are made through military channels, and customers ... well, the locals need materials to rebuild buildings and repair equipment. I help them as much as I can, but I also have to live off something.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 5,
      unlocks: 0,
      place: "mine",
      question: "Why is the mine not working?",
      answer:
        "It works, but we are insufficiently trained to operate the equipment. Almost everyone went to fight. Recently, we've been digging by hand, because we have power cuts and the machines are not working, we use kerosene lamps to illuminate tunnels.",
      completed: false,
      shownOnce: false,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 6,
      unlocks: 7,
      place: "factory",
      question:
        "[GENERAL NELSON] What's going on here, and why were we stopped by the military?",
      answer:
        "General: You are suspected of spying on behalf of the enemy. Our ships guard the vortex through which enemy units pass and destroy our posts.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 7,
      unlocks: 8,
      place: "factory",
      question:
        "[GENERAL NELSON] We're not spies, we don't even know what's going on here!",
      answer:
        "General: You flew through one of the vortices straight to our positions, if you are not really spies and you ended up here accidentally, you will help us in the fight. We will repay you by letting you fly away safely and we will even give you supplies for the journey.",

      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 8,
      unlocks: 0,
      place: "factory",
      question:
        "[GENERAL NELSON] We'll prove to you that we have no evil intentions, what must we do?",
      answer:
        "General: The enemy battalion has taken a part of the city, which is an important transport point for us, so we cannot supply the boys with supplies. You will go over there and help our troops get this base back. Be warned this is a dangerous mission, but at the moment I don't have time and instead of shooting you I'm giving you a chance. Good luck.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 9,
      unlocks: 12,
      place: "factory",
      question:
        "[GENERAL NELSON] I report that the mission is accomplished. The enemy withdrew and we took the city.",
      answer:
        "General: Good job! I heard on the radio that they had withdrawn. I've been waiting to hear from you guys. Of course you have proved your worth and that you are not spies. You can go ahead and fly away from the planet, unless you want to stay with us and fight (laughs).",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 10,
      unlocks: 0,
      place: "factory",
      question:
        "Do you manufacture anything else here besides tanks and armored vehicles?",
      answer:
        "The factory building was transformed into a barracks and a workshop. We don't produce anything here, we repair what gets damaged. We bring vehicles with spaceships from other planets, it is faster.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 11,
      unlocks: 0,
      place: "factory",
      question: "Why is the war going on?",
      answer:
        "Corporations want to get their hands on the planet's natural resources. Neither side wants to let go and therefore the whole planet looks more like a pile of rubble than an industrial zone.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 12,
      unlocks: 0,
      place: "factory",
      question:
        "[GENERAL NELSON] If we were suspected of being spies why did you let us fight? After all, we could have fled to enemy territory.",
      answer:
        "We lacked people to fight so we had to trust you a little. Besides, you were not entirely alone, we hid locators in your clothes and watched you in case you turned out to be not only spies, but also deserters (laughs).",
      completed: false,
      shownOnce: false,
      hidden: true,
      specialAction: false,
      plot: true,
    },
  ],
  bathea: [
    {
      id: 1,
      unlocks: 2,
      place: "bar",
      question:
        "[PRISON GUARD] We're looking for a friend who was accused of smuggling moonshine and brought here recently. This lady is an attorney and will be defending him at the hearing.",
      answer:
        "Prison guard: You are late, the trial is over, the accused was found guilty and sentenced to 5 years in prison.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 2,
      unlocks: 0,
      place: "bar",
      question:
        "[PRISON GUARD] This is crazy! There must be a way out of the situation! It can't end like this, he's innocent....",
      answer:
        "Prison guard: Quiet. Come with me, we can help each other... I have a family to support, and here they don't pay me too much so... how to say... for 25.000 [!] I could take your friend to a bar on some pretext, and then I might have turned a blind eye to whether or not he returned back to his cell. The prison is overcrowded, and there are not enough guards for anyone to notice immediately that he is gone. Then I will think of something, maybe I will pretend his escape, at most they will go in search of him, they will find nothing and they will assume that he died outside. What do you say?",
      completed: false,
      shownOnce: true,
      hidden: true,
      plot: true,
      specialAction: {
        title: "Bribe the guard",
        action: "subtractCredits",
        requirement: 25000,
        error: "Not enough credits",
        completed: false,
      },
    },
    {
      id: 3,
      unlocks: 0,
      place: "bar",
      question: "Are there any fights here?",
      answer:
        "There are arguments from time to time, mostly among strangers. The regulars know each other and have already made up their minds on controversial topics, so they either agree or don't move them among themselves.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
  ],
  axios: [
    {
      id: 1,
      unlocks: 4,
      place: "university",
      question:
        "Supposedly you have a special department here that deals with the study of mysterious vortexes.",
      answer:
        "Yes, we have already examined a dozen of them, no one knows where they lead and whether such a journey would be safe. We are currently looking for a sponsor who will finance a research expedition that will prove once and for all whether it is possible to travel through the vortexes. We're going to send a crew of volunteers to fly over one of them that recently appeared.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: false,
      plot: true,
    },
    {
      id: 2,
      unlocks: 0,
      place: "casino",
      question:
        "Reportedly, one of the mercenaries in Axios' orbit recently stumbled upon an empty spacecraft, the crew of which evaporated without a trace. You know something about it?",
      answer:
        "I've heard something about this, but you'd better stop asking about it. There are rumors that this ship was an expedition by some influential stock market businessman. Apparently, they were carrying some special cargo and one of the mercenaries looked inside the container. It turned out to be a forbidden long time ago and illegal weapon that they were supposed to deliver to Centuria under the pretext of an ordinary expedition. Of course, the crew probably saw something they should not see and immediately evaporated... The question is whether they escaped or someone helped them disappear.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 3,
      unlocks: 0,
      place: "university",
      question: "Tell me about the past simple form of 'to be'.",
      answer:
        "We use was/were as the past simple forms of be. Was is used for I/he/she/it and were for you/we/they. The negative forms are was not (wasn’t) and were not (weren’t). Was/were are the past forms of am/is/are. Examples: I was in my rocket yesterday. We were happy after shopping. Sharik wasn't hungry. We were curious of that new planet. I'm good. => I was good. She is in my rocket. => She was in my rocket yesterday.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 4,
      unlocks: 6,
      place: "casino",
      question:
        "[CASINO OWNER] I am looking for a sponsor for a research trip that will test the possibility of traveling through the vortexes. This is a unique trip that can bring you wealth and honor. Who knows what we can find on the other side of the vortex.",
      answer:
        "I could help you, it looks interesting. However, I have a problem here with the local population, and more specifically with the inhabitants of the slums. A group is blocking the construction of a new casino on the outskirts of town. I get the impression that they don't like me very much and that is why they don't get bribed. Their protests deter investors. If you can convince them to let me go, I will finance your trip.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 5,
      unlocks: 0,
      place: "shop",
      question:
        "The planet is densely populated, you must have many customers.",
      answer:
        "I have as many clients as there are thieves. I have to watch out, because the biggest gangs in the galaxy are fighting for influence in the city and are trying to use my suppliers to smuggle their forbidden goods. They were at my place once and they wanted me to stuff my truck with their moonshine supplies, I refused and the next day someone set fire to the store. Fortunately, the fire was noticed quickly and was put out in time. I was even wondering if I should move to the outskirts of the city, but it is also not safe there, there are fewer police patrols.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 6,
      unlocks: 7,
      place: "factory",
      question:
        "[FACTORY WORKER] I heard that some residents do not like the idea of building another casino in the area. What exactly is it about?",
      answer:
        "The casino unions are protesting against the construction because they believe that workers' rights are being violated in the casinos. They are being forced to set up games for wealthy and powerful businessmen. Casino owners want their very influential guests to leave the casino happy and to remember their stay pleasantly, so employees have to make them win - not every time, of course, but in the end they have to win. Besides, these guys don't like to lose.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 7,
      unlocks: 8,
      place: "factory",
      question:
        "[FACTORY WORKER] Will you put me in touch with a trade union representative?",
      answer:
        "No problem, go to the office and talk to Bob. He's our supervisor and he has contacts everywhere.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 8,
      unlocks: 9,
      place: "factory",
      question:
        "[BOB] I'm here about building a new casino. I know that you and the inhabitants of the slums are protesting against the construction. I understand your case, therefore I have a solution for you. I am in contact with the University of Axios, which is organizing an expedition to research vortex travel. Nobody knows what is on the other side of these vortices, if it turns out that we discover new planets, I can get you the exclusive right to populate one of them. You won't have to live in slums anymore - it's a chance for a better life. You just have to let this casino build, and then its owner will agree to finance our expedition.",
      answer:
        "Sounds good, but it's a dangerous business, I don't trust the businessmen in the affluent neighborhood, they're dangerous people. But I like you and I can see the point in what you say. You seem like an honest guy, so I'll trust you. Go tell this bandit we'll step down and let him build his casino, I'll convince the locals.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 9,
      unlocks: 10,
      place: "casino",
      question:
        "[CASINO OWNER] I managed to convince the local people to let you build this casino. Can I announce at the university that you will finance the expedition?",
      answer:
        "Come on... you are a clever and effective guy. I could use someone like you. If you ever look for a job, contact me. Now to the point, go back to the university and get everything ready, and I'll pay for what it takes.",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: false,
      plot: true,
    },
    {
      id: 10,
      unlocks: 0,
      place: "university",
      question:
        "The owner of the casino network agreed to fund the expedition.",
      answer:
        "That's great, it will be the first expedition of this type in the history of our galaxy. I can not wait!",
      completed: false,
      shownOnce: true,
      hidden: true,
      specialAction: {
        title: "Prepare the expedition",
        action: "expedition",
        requirement: 0,
        error: "",
        completed: false,
      },
      plot: true,
    },
  ],
  desertia: [
    {
      id: 1,
      unlocks: 0,
      place: "shop",
      question: "I need rocket fuel.",
      answer:
        "I've been waiting for you. I don't usually trade such goods in a store, I import and sell them to factories that have a special license to trade rocket fuel. A guy already paid and said someone will come in for it so it has to be you. I heard about your expedition, news travels fast here, good luck to you.",
      completed: false,
      shownOnce: true,
      hidden: false,
      specialAction: {
        title: "Buy rocket fuel",
        action: "expedition supplies",
        requirement: 0,
        error: "",
        completed: false,
      },
      plot: true,
    },
    {
      id: 2,
      unlocks: 0,
      place: "university",
      question: "Tell me about the past simple form of 'to be'.",
      answer:
        "We use was/were as the past simple forms of be. Was is used for I/he/she/it and were for you/we/they. The negative forms are was not (wasn’t) and were not (weren’t). Was/were are the past forms of am/is/are. Examples: I was in my rocket yesterday. We were happy after shopping. Sharik wasn't hungry. We were curious of that new planet. I'm good. => I was good. She is in my rocket. => She was in my rocket yesterday.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 3,
      unlocks: 0,
      place: "shop",
      question: "What's going on around here?",
      answer:
        "Apparently, there has been a recent escape from Bathea prison. Poor prisoner, they reportedly found him frozen a few kilometers from the place of escape. This planet is famous for its harsh climatic conditions, that's why they built a prison there.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 4,
      unlocks: 0,
      place: "casino",
      question: "Do residents visit this place often?",
      answer:
        "Residents rarely come here, even if it is to watch tourists play. It is quite a popular place on the planet, so much so that some of the inhabitants have gambling debts. There are those who have been caught cheating and they are now banned from casinos across the galaxy.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 5,
      unlocks: 0,
      place: "casino",
      question:
        "What do the inhabitants of the temple district feel about gambling?",
      answer:
        "There were a few who tried to protest against what they called demoralisation, but they quickly gave in to realize that a businessman is also a man, and in addition, one who can fund an altar out of the goodness of his heart. Eventually they realized that gambling was a gift of mankind, and while they stay away from it themselves, now they are not spreading their ridiculous warnings to others.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 6,
      unlocks: 0,
      place: "shop",
      question: "Have you ever heard of arms smugglers?",
      answer:
        "I've heard of moonshine smugglers, but there are only rumors about arms smugglers. There are rumored to be rich folks on Axios who supply illegal weapons to gangs who, in turn, fight against the competition of businessmen. Axios is famous for its crime, which is why some of the capital's inhabitants moved to the outskirts of the city.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
  ],
  centuria: [
    {
      id: 1,
      unlocks: 0,
      question: "question",
      answer: "answer",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
    {
      id: 2,
      unlocks: 0,
      place: "university",
      question: "Tell me about the past simple form of 'to be'.",
      answer:
        "We use was/were as the past simple forms of be. Was is used for I/he/she/it and were for you/we/they. The negative forms are was not (wasn’t) and were not (weren’t). Was/were are the past forms of am/is/are. Examples: I was in my rocket yesterday. We were happy after shopping. Sharik wasn't hungry. We were curious of that new planet. I'm good. => I was good. She is in my rocket. => She was in my rocket yesterday.",
      completed: false,
      shownOnce: false,
      hidden: false,
      specialAction: false,
      plot: false,
    },
  ],
};

export const narration = {
  menu: [
    {
      id: 1,
      title: "Congratulations!",
      content: [
        {
          id: 1,
          text: "We have completed the trip! We got home safe and sound. The vortex turned out to be leading back to the Milky Way.",
        },
        {
          id: 2,
          text: "Now that we have discovered a way to intergalactic travel, we can continue to explore the newly discovered galaxy. Who knows, maybe we'll discover new planets...",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  crion: [
    {
      id: 1,
      title: "Landing",
      content: [
        {
          id: 1,
          text: "Strange... I just woke up in a space rocket and the last thing I remember is that I participated in a space mission exploring a galaxy that sent our crew (three people and a dog) in a small rocket to investigate some strange vortex in the distance. After we got there, we had problems with the control system and connectivity. Johnny said it was due to electromagnetic discharges near this vortex...",
        },
        {
          id: 2,
          text: "Apart from me and the dog Sharik, there is no one here. Two escape capsules have also disappeared. Where am I and what happened to the rest of the crew?",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  therion: [
    {
      id: 1,
      title: "Hope",
      content: [
        {
          id: 1,
          text: "After it turns out that the mercenaries returning from the mission brought my rocket to Crion and left I have to find them and ask for more details. Maybe I can find out something that will allow me to find the rest of the crew.",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  crystalia: [
    {
      id: 1,
      title: "On the trail of a friend",
      content: [
        {
          id: 1,
          text: "After I found out that the escape capsule fired from our rocket was heading towards Crystalia, I have to find my friend and find out why he left the rocket and where the other crew member is. I hope they are both alive and well and that we can find a way home.",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  thalia: [
    {
      id: 1,
      title: "Searching for Johnny",
      content: [
        {
          id: 1,
          text: "The story begins to make sense, oddly enough, the vortex journey made only me lose my memory, but luckily I start to remember certain events as I learn more and more facts.",
        },
        {
          id: 2,
          text: "After talking to the mercenaries, I expected to meet Johnny on Crystalia, who was the last to detach, and instead I met Anna, who explained to me that as a result of encountering an enemy UFO ship that destroyed another ship, we decided to flee and then the enemy started chasing us. We decided we would split up, so we fired Anna in a escape pod that landed on Crystalia. So Johnny had to pass this planet and go elsewhere. The trail leads to Thalia...",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  bathea: [
    {
      id: 1,
      title: "Troubles and lack of time...",
      content: [
        {
          id: 1,
          text: "The good news is that Johnny is alive, but the bad news is that he has been framed for smuggling and is facing a heavy punishment for it. He was transported to the prison on Bathea, where a trial will be held, as a result of which he may be imprisoned for many years. There is no time to waste, he needs to be saved, I don't know how yet, but we'll definitely figure something out.",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  axios: [
    {
      id: 1,
      title: "Great escape",
      content: [
        {
          id: 1,
          text: "We bribed a prison guard and, disguised as a prison patrol with a dog, led Johnny out of the cell. We disguised him as a patrol member, and under the guise of training in topography outside the prison, we escaped to the rocket with which we got to Axios.",
        },
        {
          id: 2,
          text: "We learned from Johnny that after Anna left the rocket, the UFO chasing us began to dangerously approach us and prepare to fire. At the last moment, a second UFO ship arrived and started attacking the one who was chasing us. It gave us time to escape, luckily we managed to get away before we ran out of fuel. Then we decided that Johnny would leave the rocket in search of help. The escape capsules have their own controls, but they cannot be flown on their own for long, which is why both Anna and Johnny did not travel very far.",
        },
        {
          id: 3,
          text: "Now that we have arrived at Axios, we need information on the vortex that entered this strange galaxy. I hope we can get home safely by walking through it again.",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  desertia: [
    {
      id: 1,
      title: "Preparing for the trip",
      content: [
        {
          id: 1,
          text: "After we organized an expedition at Axios University to investigate mysterious vortices in the galaxy, I decided to join the crew that will undertake a journey through one of the vortices.",
        },
        {
          id: 2,
          text: "We decided to take off from the temperate zone on the planet Desertia which seems to be the best place to start in the area due to its atmosphere. On the spot, we also have to take care of rocket fuel, which is currently unavailable on Axios due to gang wars that have recently attacked fuel shipments.",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  xillon: [
    {
      id: 1,
      title: "A dangerous journey",
      content: [
        {
          id: 1,
          text: "Purchasing rocket fuel turned out to be hassle free, as the entire transaction had already been paid for and the goods were waiting to be picked up. We decided that the four of us (because we consider the dog to be a crew member) would be enough to check where the vortex is leading, we did not want to endanger anyone else.",
        },
        {
          id: 2,
          text: "We can say that the mission ended with a great success, although we expected different scenarios, but we did not think that we would land in a war zone next to a planet completely destroyed by the fighting troops. The vortex dropped us off next to Xillon, where it turned out that the war was going on.",
        },
        {
          id: 3,
          text: "It would be good now to get out of this planet as soon as possible, unfortunately, after passing through the vortex, the military immediately surrounded our rocket and escorted us to the planet, where we are being interrogated.",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
  centuria: [
    {
      id: 1,
      title: "Home",
      content: [
        {
          id: 1,
          text: "After getting out of the war zone, we can finally go home safely. At Xillon, we learned that there are several types of vortexes and that some of them are safe to travel through. Unfortunately, some vortices are unpredictable and you have to be very careful not to confuse them, because then you can be crushed by pressure.",
        },
        {
          id: 2,
          text: "Centuria is a very strange planet, the inhabitants do not like strangers, but they are not rude either. You can see that they are worried about their planet. This is the last stop, the vortex we're really looking for is close to the planet, but we need to take a break to replenish supplies. Thanks to the military, we have learned to distinguish the vortices, this one here is the same as the one through which we got into this galaxy. Apparently, no one has flew into it yet, it has appeared recently and it is not known where it leads - something tells me that we are lucky ...",
        },
      ],
      completed: false,
      unlocked: false,
    },
  ],
};

export default dialogues;
