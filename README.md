# CaseWorkbench

Front-end prototype of a case management workbench for a health-plan RN. All five members are synthetic. There is no backend, authentication, or live API.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (http://localhost:5173).

```bash
npm run build
```

## Demo path

1. Start on the priority queue. Eleanor Brooks is High.
2. Open Member 360 and review the medication conflict. Neither dose is selected for you.
3. Choose Prepare outreach.
4. Capture an outcome, generate the draft, tick “I have reviewed this draft”, then Approve & sign.
5. The note and tasks update. Priority stays where the rules left it.

Demo controls in the top bar can simulate an unavailable LLM and show the P0 safety banner.
