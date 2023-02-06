import { html, css, getColorForPercent } from '../utils.js'

const Bar = (tests) => (test, i) => {
  const max = Math.max(...tests.map((x) => x.ops))
  const percent = test.ops ? (test.ops / max) * 100 : 0
  return html`
    <div className=${style.result}>
      <div className=${style.bar}>
        <span
          style=${{
            width: '3px',
            transition: 'height 0.3s, background 0.3s',
            height: `${test.ops === -1 ? 100 : test.ops === -2 ? 0 : percent}%`,
            background:
              test.ops === -1
                ? getColorForPercent(0)
                : getColorForPercent(percent / 100),
          }}
        ></span>
      </div>
      <p className=${style.id}>${i + 1}</p>
      <div className=${style.label}>
        ${test.ops === -1 || test.ops === -2
          ? `${0}%`
          : test.ops === 0
          ? html` <img className=${style.spinner} src="/spinner.gif" /> `
          : `${percent << 0}%`}
      </div>
    </div>
  `
}

export default ({ state, dispatch }) => {
  const { tests, title, started } = state
  return html`
    <aside className=${style.aside}>
      <div className=${style.graph}>
        ${tests.filter((x) => x.ops !== -2).map(Bar(tests))}
      </div>
      <input
        disabled=${started}
        className=${style.title}
        onInput=${(e) => dispatch({ title: e.target.value })}
        value=${title}
      />

      <div className=${style.warning}>
        Microbenchmarking is ${' '}
        <a
          target="_blank"
          className=${style.caveatLink}
          href="https://mrale.ph/blog/2012/12/15/microbenchmarks-fairy-tale.html"
        >
          riddled with caveats
        </a>. <br />
        Take the results with a big grain of salt.
      </div>

      <div className=${style.source}>
        <div>
          Provided with ❤️ by
          <a target="_blank" href="https://www.builder.io">
            <img
              height="138"
              width="484"
              className=${style.builderLogo}
              src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F4552cad266e64b24801f5321c829f1ca?width=500"
            />
          </a>
        </div>
        <div className=${style.links}>
          <a
            className=${style.link}
            target="_blank"
            href="https://github.com/steve8708/perflink"
            >Source</a
          >
          •
          <a
            className=${style.link}
            target="_blank"
            href="https://github.com/lukejacksonn/perflink"
            >Credit: Luke Jackson</a
          >
        </div>
      </div>
    </aside>
  `
}

const style = {
  warning: css`
    margin-top: 1rem;
    color: #999;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.2rem;
  `,
  builderLogo: css`
    height: auto;
    width: 100px;
    margin-left: 6px;
    margin-top: -2px;
    vertical-align: middle;
  `,
  caveatLink: css`
    color: #ccc !important;
  `,
  link: css`
    margin: 5px;
    display: inline-block;
  `,
  links: css`
    margin-top: 15px;
    font-size: 12px;

    & a {
      color: #999;
    }
  `,
  source: css`
    margin-top: 30px;
    text-align: center;
    color: #999;
    margin-bottom: -30px;
    font-size: 16px;
  `,
  aside: css`
    grid-area: graph;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 3rem 3rem 4rem;
    overflow-x: auto;
    max-width: 100vw;

    & div > div + div {
      margin-left: 1rem;
    }
  `,
  graph: css`
    margin: 0 auto;
    flex: 1 1 100%;
    padding: 3rem 3rem 3rem;
    display: flex;
  `,
  title: css`
    text-align: center;
    width: 100%;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.62);
    font-size: 1.2rem;
    flex: none;
    padding: 0;
    font-weight: bold;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    outline: none;
    max-width: 100%;
  `,
  result: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  bar: css`
    display: flex;
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.1);
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
  `,
  label: css`
    width: 3rem;
    margin-top: 1rem;
    height: 1rem;
    text-align: center;
    font-weight: 100;
    color: rgba(255, 255, 255, 0.5);
  `,
  spinner: css`
    width: 1rem;
    height: 1rem;
    opacity: 0.5;
  `,
  id: css`
    width: 2rem;
    height: 2rem;
    flex: none;
    background: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.62);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  `,
}
