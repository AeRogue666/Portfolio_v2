const CHANNEL_NAME = "cms-preview";

export function useContentPreview() {
  const channel = new BroadcastChannel(CHANNEL_NAME);

  const publish = (payload: unknown) => {
    channel.postMessage(payload);
  };

  const subscribe = (callback: (payload: any) => void) => {
    channel.onmessage = (event) => {
      callback(event.data);
    };
  };

  const destroy = () => {
    channel.close();
  };

  return {
    publish,
    subscribe,
    destroy,
  };
}
