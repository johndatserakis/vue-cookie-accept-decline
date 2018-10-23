import { shallowMount } from '@vue/test-utils'
import VueCookieAcceptDecline from '@/vue-cookie-accept-decline.vue'

describe('VueCookieAcceptDecline.vue', () => {
    it('Sets props correctly', async () => {
        let initialPropsData = {
            elementId: 'myPanel1',
            debug: false,
            position: 'bottom-left',
            type: 'floating',
            disableDecline: false,
            transitionName: 'slideFromBottom'
        }

        const wrapper = shallowMount(VueCookieAcceptDecline, {
            propsData: {
                elementId: initialPropsData.elementId,
                debug: initialPropsData.debug,
                position: initialPropsData.position,
                type: initialPropsData.type,
                disableDecline: initialPropsData.disableDecline,
                transitionName: initialPropsData.transitionName
            }
        })

        expect(wrapper.vm.elementId).toBe(initialPropsData.elementId)
        expect(wrapper.vm.debug).toBe(initialPropsData.debug)
        expect(wrapper.vm.position).toBe(initialPropsData.position)
        expect(wrapper.vm.type).toBe(initialPropsData.type)
        expect(wrapper.vm.disableDecline).toBe(initialPropsData.disableDecline)
        expect(wrapper.vm.transitionName).toBe(initialPropsData.transitionName)
    })

    it('Sets the accept cookie correctly', async () => {
        let initialPropsData = {
            elementId: 'myPanel1',
            debug: false,
            position: 'bottom-left',
            type: 'floating',
            disableDecline: false,
            transitionName: 'slideFromBottom'
        }

        const wrapper = shallowMount(VueCookieAcceptDecline, {
            propsData: {
                elementId: initialPropsData.elementId,
                debug: initialPropsData.debug,
                position: initialPropsData.position,
                type: initialPropsData.type,
                disableDecline: initialPropsData.disableDecline,
                transitionName: initialPropsData.transitionName
            }
        })

        // Run the accept function
        wrapper.vm.accept()
        expect(wrapper.vm.status).toBe('accept')

        // Check the event was emitted properly
        expect(wrapper.emitted().clickedAccept).toBeTruthy()
    })

    it('Sets the decline cookie correctly', async () => {
        let initialPropsData = {
            elementId: 'myPanel1',
            debug: false,
            position: 'bottom-left',
            type: 'floating',
            disableDecline: false,
            transitionName: 'slideFromBottom'
        }

        const wrapper = shallowMount(VueCookieAcceptDecline, {
            propsData: {
                elementId: initialPropsData.elementId,
                debug: initialPropsData.debug,
                position: initialPropsData.position,
                type: initialPropsData.type,
                disableDecline: initialPropsData.disableDecline,
                transitionName: initialPropsData.transitionName
            }
        })

        // Run the decline function
        wrapper.vm.decline()
        expect(wrapper.vm.status).toBe('decline')

        // Check the event was emitted properly
        expect(wrapper.emitted().clickedDecline).toBeTruthy()
    })

    it('Removes cookie correctly', async () => {
        let initialPropsData = {
            elementId: 'myPanel1',
            debug: false,
            position: 'bottom-left',
            type: 'floating',
            disableDecline: false,
            transitionName: 'slideFromBottom'
        }

        const wrapper = shallowMount(VueCookieAcceptDecline, {
            propsData: {
                elementId: initialPropsData.elementId,
                debug: initialPropsData.debug,
                position: initialPropsData.position,
                type: initialPropsData.type,
                disableDecline: initialPropsData.disableDecline,
                transitionName: initialPropsData.transitionName
            }
        })

        // Run the decline function
        wrapper.vm.decline()
        expect(wrapper.vm.status).toBe('decline')

        // Now delete the cookie
        wrapper.vm.removeCookie()
        expect(wrapper.vm.status).toBe(null)

        // Check the event was emitted properly
        expect(wrapper.emitted().removedCookie).toBeTruthy()
    })
})