import { useAppConfig } from "#imports";

export default (url: string, sourceSection: string) => {
  const { appHostname } = useAppConfig();

  const newUrl: URL = new URL(url);
  newUrl.searchParams.set("utm_source", appHostname);
  newUrl.searchParams.set("utm_medium", "referral");
  newUrl.searchParams.set("utm_campaign", "portfolio");
  newUrl.searchParams.set("utm_content", sourceSection);

  return newUrl.toString();
};
