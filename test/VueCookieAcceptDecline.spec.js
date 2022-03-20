import VueCookieAcceptDecline from '@/vue-cookie-accept-decline.vue';
import { shallowMount } from '@vue/test-utils';

describe('VueCookieAcceptDecline.vue', () => {
  it('Sets props correctly', async () => {
    let initialProps = {
      elementId: 'myPanel1',
      debug: false,
      position: 'bottom-left',
      type: 'floating',
      disableDecline: false,
      transitionName: 'slideFromBottom',
    };

    const wrapper = shallowMount(VueCookieAcceptDecline, {
      props: {
        elementId: initialProps.elementId,
        debug: initialProps.debug,
        position: initialProps.position,
        type: initialProps.type,
        disableDecline: initialProps.disableDecline,
        transitionName: initialProps.transitionName,
      },
    });

    expect(wrapper.vm.elementId).toBe(initialProps.elementId);
    expect(wrapper.vm.debug).toBe(initialProps.debug);
    expect(wrapper.vm.position).toBe(initialProps.position);
    expect(wrapper.vm.type).toBe(initialProps.type);
    expect(wrapper.vm.disableDecline).toBe(initialProps.disableDecline);
    expect(wrapper.vm.transitionName).toBe(initialProps.transitionName);
  });

  it('Sets the accept cookie correctly', async () => {
    let initialProps = {
      elementId: 'myPanel1',
      debug: false,
      position: 'bottom-left',
      type: 'floating',
      disableDecline: false,
      transitionName: 'slideFromBottom',
    };

    const wrapper = shallowMount(VueCookieAcceptDecline, {
      props: {
        elementId: initialProps.elementId,
        debug: initialProps.debug,
        position: initialProps.position,
        type: initialProps.type,
        disableDecline: initialProps.disableDecline,
        transitionName: initialProps.transitionName,
      },
    });

    // Run the accept function
    wrapper.vm.accept();
    expect(wrapper.vm.status).toBe('accept');

    // Check the event was emitted properly
    expect(wrapper.emitted('clicked-accept')).toBeTruthy();
  });

  it('Sets the decline cookie correctly', async () => {
    let initialProps = {
      elementId: 'myPanel1',
      debug: false,
      position: 'bottom-left',
      type: 'floating',
      disableDecline: false,
      transitionName: 'slideFromBottom',
    };

    const wrapper = shallowMount(VueCookieAcceptDecline, {
      props: {
        elementId: initialProps.elementId,
        debug: initialProps.debug,
        position: initialProps.position,
        type: initialProps.type,
        disableDecline: initialProps.disableDecline,
        transitionName: initialProps.transitionName,
      },
    });

    // Run the decline function
    wrapper.vm.decline();
    expect(wrapper.vm.status).toBe('decline');

    // Check the event was emitted properly
    expect(wrapper.emitted('clicked-decline')).toBeTruthy();
  });

  it('Sets the postpone cookie correctly', async () => {
    let initialProps = {
      elementId: 'myPanel1',
      debug: false,
      position: 'bottom-left',
      type: 'floating',
      disableDecline: false,
      transitionName: 'slideFromBottom',
    };

    const wrapper = shallowMount(VueCookieAcceptDecline, {
      props: {
        elementId: initialProps.elementId,
        debug: initialProps.debug,
        position: initialProps.position,
        type: initialProps.type,
        disableDecline: initialProps.disableDecline,
        transitionName: initialProps.transitionName,
      },
    });

    // Run the postpone function
    wrapper.vm.postpone();
    expect(wrapper.vm.status).toBe('postpone');

    // Check the event was emitted properly
    expect(wrapper.emitted('clicked-postpone')).toBeTruthy();
  });

  it('Removes cookie correctly', async () => {
    let initialProps = {
      elementId: 'myPanel1',
      debug: false,
      position: 'bottom-left',
      type: 'floating',
      disableDecline: false,
      transitionName: 'slideFromBottom',
    };

    const wrapper = shallowMount(VueCookieAcceptDecline, {
      props: {
        elementId: initialProps.elementId,
        debug: initialProps.debug,
        position: initialProps.position,
        type: initialProps.type,
        disableDecline: initialProps.disableDecline,
        transitionName: initialProps.transitionName,
      },
    });

    // Run the decline function
    wrapper.vm.decline();
    expect(wrapper.vm.status).toBe('decline');

    // Now delete the cookie
    wrapper.vm.removeCookie();
    expect(wrapper.vm.status).toBe(null);

    // Check the event was emitted properly
    expect(wrapper.emitted('removed-cookie')).toBeTruthy();
  });
});
