import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/world';
import { verifyAuthenticationEntryPoints } from '../../src/functions/auth.functions';
import { verifySearchJourneyEntryPoint } from '../../src/functions/booking.functions';

Then('les points d\'entrée de connexion sont visibles', async function (this: CustomWorld) {
  await verifyAuthenticationEntryPoints(this.page);
});

Then('le point d\'entrée de recherche est visible', async function (this: CustomWorld) {
  await verifySearchJourneyEntryPoint(this.page);
});
