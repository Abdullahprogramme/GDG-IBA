export {};
const value=process.env.SITE_URL;
try {
  if(!value)throw new Error('Set SITE_URL to the confirmed HTTPS production origin in the hosting environment.');
  const url=new URL(value);
  if(url.protocol!=='https:'||['localhost','127.0.0.1','[::1]'].includes(url.hostname)||url.username||url.password||url.pathname!=='/'||url.search||url.hash)throw new Error('SITE_URL must be an HTTPS origin without credentials, a path, query or fragment.');
  console.log('Deployment origin configuration is valid.');
} catch(error) {
  console.error(error instanceof Error?error.message:'Invalid SITE_URL.');
  process.exitCode=1;
}
