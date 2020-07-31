![](public/github-header.jpg)

## What is Next-Snake?
Next-Snake is a minimalistic Snake browser game, built using Next.js and React.\
I challenge you to beat a score of 30! [Give it a shot!](https://next-snake.vercel.app/)

## Why Next.js and React?
Instead of having classic intervals running the game, React enables the use of useState and useEffect for updating the canvas. Additionally React hooks enable the custom [setInterval declarative](https://github.com/donavon/use-interval) as described by [Dan Abramaov](https://github.com/gaearon) on his [personal blog](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

Using the setInterval declarative, it is possible to easily pause the interval and dynamically change the speed at which the interval runs, making it easy to implement game mechanics such as the snake speeding up after a certain amount of points are collected.

![](public/demo.gif)

This project was a great opportunity to achieve a deeper understanding of how React hooks work, and how data is read and updated within a React frontend. Next.js made it easy for the project to get legs, as there was no time spent worrying about routing and scss support. Additionally, hosting the project on vercel made Next.js the obvious option when developing with React.

## Contributing
If you happen to find any bugs whilst playing; have ideas on improving the core gameplay; or you want to contribute directly, feel free to open an issue or pull request!