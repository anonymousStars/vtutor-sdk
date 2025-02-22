async function helloWorldEvery5Second() {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const event = new CustomEvent("message");
    event.data = {
      action: "unitySpeak",
      //       message: `Never gonna give you up
      // Never gonna let you down
      // Never gonna run around and desert you
      // Never gonna make you cry
      // Never gonna say goodbye
      // Never gonna tell a lie and hurt you`,
      message: `對這個世界如果你有太多的抱怨
      跌倒了就不敢繼續往前走
      為什麼人要這麼的脆弱 墮落
      請你打開電視看看
      多少人為生命在努力勇敢的走下去
      我們是不是該知足
      珍惜一切 就算沒有擁有`,
    };
    window.dispatchEvent(event);
    // await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}
// helloWorldEvery5Second();
