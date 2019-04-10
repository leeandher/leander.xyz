### Cracking the Coding Interview

#### Notes on a talk by: Marcelo Cortes at Indigo Fair

_This talk will be focused on full-time interview rather than coop interviews_

**The Interview Basics**

- Different Interview Types
- Coding (Solving some basic problem, efficiently and w/ good communication)
- Algorithms (won't need to code directly (most times), white-boarding, done by Google and FB)
- System Design (Example Google asks: _how would you design the backend of Gmail_)
- Selling (trying to get you to work at the company, a final step)
- This talk will be focusing on the _coding_ interview
- Different Coding Interview Environments
- Phone (rare but difficult, relies on verbal explanation)
- Video Conference (0.5-1h, using a code-share, watching you live)
- Onsite with a remote interviewer
- Onsite with a whiteboard (conventional, requires good explaining skills)
- Onsite pair programming interview (most common, dedicated computer for you)

**The Interviewer's POV**

- They are busy and must _stop_ working to interview you
- They are not there to fail you, they want teammates, and want your success
- They want to enjoy the interview
- good discussions
- learn something new / teach you something
- experience what you would be like on their team
- Most importantly, they answer: **_Do I want this person on my team?_**

**What they look for?**

- Can you communicate your ideas effectively?
- How well do you know the language (syntax, methods, basics)
- Are you coach-able? Are you listening to feedback, are you receptive?
- How familiar are you with the tools? Do you know the IDE? Editor?
- Are you practicing and putting effort to better yourself?
- Do you know algorithms?
- Are you thinking about the long-term (runtime, memory, etc.)?
- Can you code? Recursion? Iteration? Data structures?
- Do you care about code style? Naming? Strategy and approach? Do you keep patching edge cases or do you think ahead?

**Coding Interview Structure (60 minute example)**

- 00..02: Quick intro and get setup
- 02..05: Describing the coding problem
- 05..15: Discussing the algorithm and possible solutions
- You don't want to jump into code, this is where you ask questions, and understand the problem you want to solve
- 15..55: Coding the actual solution
- 55..60: Candidate's turn to ask questions
- This is where you show that you care about the company and the work they do

**A Simple Problem**

- Given a list of words, find the maximum common prefix between any two words on the list.

```
 words = [
   'electronics',
   'compact disc',
   'alphabet',
   'compass',
   'giraffe',
   'electricity'
 ]
 prefix = 'elect'
```

- _Questions to Ask_
- What alphabet? Lowercase A to Z? ASCII? Unicode?
- Do we expect the input to be very large?
- Do we expect the average string length to be large?
- What if there is a tie?
- Is null or empty input expected?
- The Easy Way Itself
- Is there an obvious brute force (inefficient) solution? _Probably_
- mention it and quickly explain how the algorithm solution works to show you know it.
- ex: "Compare each word to each other, and store the longest prefix as a variable. Once all words have been compared, return the variable"
- Can We do Better?
- Almost always there is a better solution
- Best way to get good at algorithms is practicing (Check out [TopCoder](https://topcoder.com))
- Always ask questions such as;

  - Does sorting input help?
  - What data structures could help? _Set? Hash map? Tree?_
  - Can I collect data to help in a first pass?

- Define the Interface
  - Method, Variable Names, Process, Comments
  - Validation Framework (5 min)
  - Write simple test cases (including an _All Tests Passed!_ message)

_Note: A Trie/Tree is usually the ideal solution for most 'prefix' questions_

**Your Time to Interview**

- Don't Ask
- how did you do in the interview, your solution, other Solutions
- better ways to solve the Problem
- salary, bonus, options, etc.
- Do Ask
- About the company, team, the culture, the product, the job
- The tools, the work environment, the mission, the vision
- How the team prioritizes tasks, etc.

**Conclusion**

- Practice a lot! Be prepared, stay calm and perform well.
- Arrive early, have your environment ready. (Don't waste time on setup or updates)
- Communicate well and often. Ask questions. Keep talking.
- Talk about your code while you write it.
- Let the interviewer in your head, communicate properly with them
- Have a strategy. Discuss options, If stuck, ask for advice. (They want to help you, write pseudo code, explain why you're stuck, let them assist you)
- Make sure you understand the problem. Write a simple test framework. Start with a test case.
- Try to have fun!

**QnA**

- Email: marcelo@indigofair.com
- Twitter: _@mescortes_
- Company: Indigo Fair

Full source code: https://goo.gl/vMMjr3
