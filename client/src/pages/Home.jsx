import { useState } from 'react';
import UIRenderer from '../components/UIRenderer';
import { generateUI } from '../services/api';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const [prompt, setPrompt] = useState('');
  const [uiData, setUiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setError('Please enter a prompt to generate the UI.');
      return;
    }

    console.log('Generating UI for prompt:', trimmedPrompt);
    setLoading(true);
    setError('');

    try {
      const data = await generateUI(trimmedPrompt);
      console.log('API returned:', data);
      setUiData(data);
      console.log('uiData updated to:', data);
    } catch (err) {
      console.error('API call failed:', err);
      setError('Unable to generate UI. Ensure the backend is running and reachable.');
      setUiData({
        page: 'landing',
        components: [
          {
            type: 'hero',
            props: {
              title: 'Unable to render generated UI',
              subtitle: 'Please check your connection and try again.',
              cta: 'Retry',
            },
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen px-4 py-10 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}>
      <div className={`mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-[2rem] p-8 shadow-2xl ${theme === 'dark' ? 'bg-slate-900/95 shadow-slate-950/40' : 'bg-white/90 shadow-slate-200/20'}`}>
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Text to Design</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Generate React UI from JSON.</h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400">
            Enter a prompt and render a dynamic page directly from the API JSON response.
          </p>
        </header>

        <section className={`grid gap-4 rounded-[1.75rem] p-6 ${theme === 'dark' ? 'border border-slate-800 bg-slate-950/80' : 'border border-slate-200 bg-white/95'}`}>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={5}
            placeholder="Describe the page layout you want, for example: 'Create a landing page with a hero, navbar, and cards.'"
            className={`min-h-[140px] w-full rounded-3xl border px-5 py-4 text-sm outline-none transition focus:border-sky-500 ${theme === 'dark' ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-slate-50 text-slate-950'}`}
            disabled={loading}
          />

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Generating...' : 'Generate UI'}
            </button>
            <p className="text-sm text-slate-400">Backend endpoint: <span className="font-medium text-slate-100">/generate-ui</span></p>
          </div>

          {error && <div className="rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div>}
        </section>

        {uiData && (
          <div className="space-y-8">
            <section className={`rounded-[1.75rem] p-6 ${theme === 'dark' ? 'border border-slate-800 bg-slate-900/90' : 'border border-slate-200 bg-white/95'}`}>
              <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>Rendered UI</h2>
              <div className="mt-6">
                <UIRenderer key={uiData ? JSON.stringify(uiData) : 'empty'} data={uiData} />
              </div>
            </section>

            <section className={`rounded-[1.75rem] p-6 ${theme === 'dark' ? 'border border-slate-800 bg-slate-900/90' : 'border border-slate-200 bg-white/95'}`}>
              <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>Raw JSON Response</h2>
              <pre className={`mt-4 max-h-[320px] overflow-auto rounded-3xl p-4 text-sm leading-6 ${theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-900'}`}>
                {JSON.stringify(uiData, null, 2)}
              </pre>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
