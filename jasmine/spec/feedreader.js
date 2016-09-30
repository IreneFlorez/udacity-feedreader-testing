/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have defined and non-empty URLs', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined(); // Check defined
                expect(allFeeds[i].url).not.toEqual(''); // Check non-empty
                expect(allFeeds[i].url).toEqual(jasmine.any(String)); // Extra: check is a string
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("each have a defined and non-empty name", function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toEqual('');
                expect(allFeeds[i].name).toEqual(jasmine.any(String)); // Extra: check is a string
            }
        })
    });


    /* A new test suite named "The menu" */
    describe("The menu", function() {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("should be hidden by default", function(done) {
            // Check via transform css property
            expect($('.slide-menu').css('transform')).toBe("matrix(1, 0, 0, 1, -192, 0)")
            // Check also that body has class 'menu-hidden'
            expect(document.body.classList).toContain("menu-hidden");
            done();
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        // Nested suite necessarily to allow waiting for CSS transitions to complete
        describe("hamburger icon", function() {
            // Get jasmine to wait before executing each spec
            // to allow any CSS transitions to complete
            beforeEach(function(done) {
                // Trigger click on hamburger icon
                $('.icon-list').click();
                // Wait enough time for transition to complete
                setTimeout(function() {
                    done();
                }, 300);
            });

            it("should make the menu appear when clicked", function(done) {
                // Expect menu to become visible
                expect($('.slide-menu').css('transform')).toBe("matrix(1, 0, 0, 1, 0, 0)")
                expect(document.body.classList).not.toContain("menu-hidden");
                done();
            });

            it("should make the menu disappear when clicked while the menu is visible",
                function(done) {
                    // Expect menu to become invisible
                    expect($('.slide-menu').css('transform')).toBe("matrix(1, 0, 0, 1, -192, 0)")
                    expect(document.body.classList).toContain("menu-hidden");
                    done();
                });
        });

    });

    /* DONE: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        // Allows testing of async functions
        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            })
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it("should load at least a single .entry element within the .feed container",
            function(done) {
                expect( $('.feed .entry').length ).toBeGreaterThan(0);
                done();
            });

        // Reload feed 0
        afterAll(function() {
            loadFeed(0);
        });

    });


    /* DONE: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        var oldFirstEntry;

        // Allows testing of async functions
        beforeEach(function(done) {
            oldFirstEntry = $('.feed .entry').get(0);
            loadFeed(2, function() {
                done();
            })
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it("should change content when a new feed is loaded", function(done) {
            expect( $('.feed .entry').get(0) ).not.toBe( oldFirstEntry );
            done();
        });

        // Reload feed 0
        afterAll(function() {
            loadFeed(0);
        });
    });

}());
