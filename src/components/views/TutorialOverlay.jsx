// Content for the tutorial
const TutorialContent = [
  <div className="tutorial-slide">
      <h2 className="tutorial-title">Welcome to the Game!</h2>
      <p className="tutorial-text">
        The timer becomes a clicking game during breaks! You can only click while the timer is running, so make the most of each break to earn Tockens!
      </p>
  </div>,


  <div className="tutorial-slide">
    <h2 className="tutorial-title">Currencies</h2>
      <p className="tutorial-text">
        There are two types of currencies in the game:<br/><b>Tockens</b> and <b>Time Crystals</b>
      </p>
      <div className="tutorial-content-flex">
        <img src="/tockens.png" alt="Tockens" className="tutorial-image" />
        <img src="/timeCrystal.png" alt="Time Crystal" className="tutorial-image" />
      </div>
      <p className="tutorial-text"><b>Tockens</b> can be obtained by clicking the timer</p>
      <p className="tutorial-text"><b>Time Crystals</b> are earned every 60 seconds of total timer runtime, including both active focus time and break time.</p>
  </div>,

  <div className="tutorial-slide">
    <h2 className="tutorial-title">Shop & Upgrades</h2>
      <p className="tutorial-text">
        <b>Tockens</b> upgrade your clicks, increasing earnings per click.
      </p>
      <p className="tutorial-text">
        <b>Time Crystals</b> are needed every 25 levels to unlock further upgrades.
      </p>
  </div>,

  <div className="tutorial-slide">
    <h2 className="tutorial-title">You're Ready!</h2>
    <p className="tutorial-text">
      Now that you know the basics, it's time to start playing. Click the finish button to begin and start earning rewards!
    </p>
  </div>

];


export default TutorialContent;
